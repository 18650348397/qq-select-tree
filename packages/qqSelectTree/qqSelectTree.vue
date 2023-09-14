<template>
  <div>
    <el-select ref="curselect" v-model="selectValue" :multiple="showCheckbox" :placeholder="placeholder"
      :filterable="filterable" :filter-method="dataFilter" :popper-append-to-body="appendToBody" collapse-tags
      @clear="clearAll" :clearable="isCanDelete" style="width:100%" :disabled="disabledSelect">
      <el-option value="1" v-loading="treeLoading" element-loading-background="rgba(255, 255, 255, 0.5)"
        element-loading-text="loading" class="option-style" disabled>
        <div class="check-box" v-if="showCheckbox">
          <el-button type="text" @click="handlecheckAll">全选</el-button>
          <el-button type="text" @click="handleReset">清空</el-button>
          <el-checkbox v-if="showSubset" v-model="isSubset" style="margin-left: 60px"
            @change="changeSubset"></el-checkbox>
          <el-button v-if="showSubset" type="text" style="margin-left: 3px;">{{ sunSetText }}</el-button>
        </div>
        <el-tree empty-text="暂无数据" :data="options" :props="defaultProps" class="tree-style" ref="treeNode"
          :show-checkbox="showCheckbox" :highlight-current="!showCheckbox" :node-key="defaultProps.value"
          :filter-node-method="filterNode" :default-checked-keys="defaultValue" :current-node-key="defaultNodeKey"
          :check-strictly="checkStrictly" @check="handleCheck" @node-click="nodeClick"
          :expand-on-click-node="showCheckbox" :default-expand-all="showAllTreeNode">
        </el-tree>
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'qq-select-tree',   //name属性必须要，该名称即为npm包导入该组件后所要使用的标签名
  props: {
    //（多选、有编辑功能时，必须）=> 编辑时回显的数组
    defaultValue: {
      type: Array,
      default: () => ([])
    },
    //（单选、有编辑功能时，必须）=> 编辑时回显的数据
    defaultNodeKey: {
      type: [String, Number],
      default: ''
    },
    //选项的数据数组（必须）
    options: {
      type: Array,
      default: () => ([])
    },
    // 配置选项（必须）
    defaultProps: {
      type: Object,
      default: () => ({ // 属性值为后端返回的对应的字段名
        children: 'children',
        label: 'label',
        value: 'value'
      })
    },
    // 是否将组件添加到body上面(组件在弹窗或者表格里面时可设为true)
    appendToBody: {
      type: Boolean,
      default: false
    },
    // 是否可搜索
    filterable: {
      type: Boolean,
      default: true // 不可以搜索
    },
    // 是否禁用下拉框
    disabledSelect: {
      type: Boolean,
      default: false
    },
    //节点是否可被勾选（是否开启复选框，默认为true，即开启复选框）
    showCheckbox: {
      type: Boolean,
      default: true
    },
    // (复选框的情况下，需要) 是否开启（展示）切换包含子集功能，如果开启，也就是该值为true的话，需同时定义 changeCheckStrictly 事件。
    showSubset: {
      type: Boolean,
      default: false
    },
    //(复选框的情况下， showSubset 为true时，需要) => 可切换包含关系的文字
    sunSetText: {
      type: String,
      default: '父子互相关联'
    },
    // (复选框的情况下，必须) => 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false（即为父子关联）
    checkStrictly: {
      type: Boolean,
      default: false
    },
    //(复选框的情况下，需要) => 最终的输出数据是否只需要输出已勾选（不含半选，即为已选的父、祖父等）的项，默认值为false，即为：父子（半选，勾选）都输出。
    isOnlySelected: {
      type: Boolean,
      default: false
    },
    // 回显的值是否可被删除 true: 可以删除；false：不能删除
    isCanDelete: {
      type: Boolean,
      default: true
    },
    //提示信息
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 不可删除报错
    errMessage: {
      type: String,
      default: '该选项不可被删除'
    },
    //是否展开所有节点
    showAllTreeNode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectValue: this.showCheckbox ? [] : '', // select-绑定值 => 文本框中的标签
      propValue: this.defaultProps.value, // value转换后的字段
      propLabel: this.defaultProps.label, // label转换后的字段
      treeLoading: false, // 加载loading
      isSubset: true,    //是否包含子集
      curCheckStrictly: this.checkStrictly,   //为了防止直接改props中的checkStrictly（单向数据流）
    }
  },
  watch: {
    // 监听回显的数据（单选）
    defaultNodeKey(val) {
      if (!this.showCheckbox) {
        if (val && val.length) {
          this.$nextTick(() => {
            let selectData = val;
            //这里为最终选择的树的选择框造型（文本框展示）
            this.selectValue = this.options.filter(i => i[this.propValue] === val)[0][this.propLabel];
            //这里为最终给父组件的输出树数据（真正用于传输后台接口的数据）
            this.$emit('input', selectData);
          })
        }
      }
    },
    // 监听回显的数据（多选）
    defaultValue(val) {
      if (this.showCheckbox) {
        if (val && val.length) {
          this.$nextTick(() => {
            let resultSelectTreeList = this.$refs.treeNode.getCheckedNodes();
            //这里为最终选择的树的选择框造型（文本框展示）
            this.selectValue = resultSelectTreeList.map(v => v[this.propLabel]);
            //这里为最终给父组件的输出树数据（真正用于传输后台接口的数据）
            let selectData = resultSelectTreeList.map(v => v[this.propValue]);
            this.$emit('input', selectData);
          })
        }
      }
    },
  },
  methods: {
    /**
     * @description: 根据对象数组中的某一键作数组去重
     * @param {*} arr 目标数组
     * @param {*} key  去重的标识符
     * @return {*}
     */
    removeDupArr(arr, key) {
      // 根据某一键去重
      const uniqueArray = arr.reduce((acc, obj) => {
        acc[obj[key]] = obj;
        return acc;
      }, {});
      // 将去重后的对象转回数组形式
      const resultArr = Object.values(uniqueArray);
      return resultArr;
    },
    //切换父子是否关联事件
    changeSubset(val) {
      this.curCheckStrictly = !val;
      this.$emit('changeCheckStrictly', this.curCheckStrictly)
    },
    // 全选
    handlecheckAll() {
      if (this.curCheckStrictly) {
        this.$message.error(`请先勾选${this.sunSetText}`)
      } else {
        this.treeLoading = true;
        this.$refs.treeNode.setCheckedNodes(this.options);
        setTimeout(() => {
          let resultSelectTreeList = this.$refs.treeNode.getCheckedNodes(false, true);
          //这里为最终选择的树的选择框造型（文本框展示）
          this.selectValue = resultSelectTreeList.map(v => v[this.propLabel]);
          //这里为最终给父组件的输出树数据（真正用于传输后台接口的数据）
          let selectData = resultSelectTreeList.map(v => v[this.propValue]);
          this.$emit('input', selectData);
          this.treeLoading = false;
        }, 200)
      }
    },
    // 清空
    handleReset() {
      if (this.isCanDelete) {
        this.treeLoading = true;
        this.$refs.treeNode.setCheckedNodes([]);
        setTimeout(() => {
          let resultSelectTreeList = this.$refs.treeNode.getCheckedNodes(false, true);
          //这里为最终选择的树的选择框造型（文本框展示）
          this.selectValue = resultSelectTreeList.map(v => v[this.propLabel]);
          //这里为最终给父组件的输出树数据（真正用于传输后台接口的数据）
          let selectData = resultSelectTreeList.map(v => v[this.propValue]);
          this.$emit('input', selectData);
          this.treeLoading = false;
        }, 200)
      } else {
        this.$message.error(this.errMessage)
      }
    },
    // 输入框关键字
    dataFilter(val) {
      this.$refs.treeNode.filter(val);
    },
    /**
     * @description: tree搜索过滤
     * @param {*} value 搜索的关键字
     * @param {*} data  筛选到的节点
     * @return {*}
     */
    filterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].toLowerCase().indexOf(value.toLowerCase()) !== -1
    },
    /**
     * @description:节点被点击时的回调
     * @param {*} data  传递给 data 属性的数组中该节点所对应的对象（当前点击的那项）（对象）
     * @param {*} node  节点对应的 Node
     * @param {*} self 节点组件本身
     * @return {*}
     */
    nodeClick(data, node, self) {
      if (!this.showCheckbox) {   //单选（非复选框）
        let selectData = data[this.propValue];
        //这里为最终选择的树的选择框造型（文本框展示）
        this.selectValue = data[this.propLabel];
        //关闭选择下拉框
        this.$refs.curselect.blur();
        //这里为最终给父组件的输出树数据（真正用于传输后台接口的数据）
        this.$emit('input', selectData);
      }
    },
    /**
     * @description: 当复选框被点击的时候触发
     * @param {*} data  当前勾选的节点对象（对象）
     * @param {*} checkedNodes  目前已勾选状态的节点对象组成的集合（数组）
     * @param {*} checkedKeys 目前已勾选状态的节点对象的唯一标识符组成的集合（数组）
     * @param {*} halfCheckedNodes 目前半勾选状态的节点对象组成的集合（数组）
     * @param {*} halfCheckedKeys 目前半勾选状态的节点对象的唯一标识符组成的集合（数组）
     * @return {*}
     */
    handleCheck(data, { checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys }) {
      if (this.curCheckStrictly) {   //父子不互相关联
        let resultSelectTreeList = checkedNodes;
        //这里为最终选择的树的选择框造型（文本框展示）
        this.selectValue = resultSelectTreeList.map(v => v[this.propLabel]);
        //这里为最终给父组件的输出树数据（真正用于传输后台接口的数据）
        let selectData = resultSelectTreeList.map(v => v[this.propValue]);
        this.$emit('input', selectData);
      } else {  //父子互相关联
        if (this.isOnlySelected) {  //最终的输出数据只输出已勾选（去除半选）
          let resultSelectTreeList = checkedNodes;
          //这里为最终选择的树的选择框造型（文本框展示）
          this.selectValue = resultSelectTreeList.map(v => v[this.propLabel]);
          //这里为最终给父组件的输出树数据（真正用于传输后台接口的数据）
          let selectData = resultSelectTreeList.map(v => v[this.propValue]);
          this.$emit('input', selectData);
        } else {  //最终的输出数据输出所有勾选（包括半选）
          let resultSelectTreeList = this.removeDupArr(checkedNodes.concat(halfCheckedNodes), this.propValue);
          //这里为最终选择的树的选择框造型（文本框展示）
          this.selectValue = resultSelectTreeList.map(v => v[this.propLabel]);
          //这里为最终给父组件的输出树数据（真正用于传输后台接口的数据）
          let selectData = resultSelectTreeList.map(v => v[this.propValue]);
          this.$emit('input', selectData);
        }
      }
    },
    // 文本框清空
    clearAll() {
      if (!this.showCheckbox) {   //单选（非复选框）
        let selectData = '';
        //关闭选择下拉框
        this.$refs.curselect.blur();
        //这里为最终给父组件的输出树数据（真正用于传输后台接口的数据）
        this.$emit('input', selectData);
      } else {  //多选（复选框）
        this.$refs.treeNode.setCheckedNodes([])
        let selectData = [];
        this.$emit('input', selectData);
      }
    },
    /**
     * @description: 若开启复选框（即 showCheckbox 为 true），则返回目前被选中的节点所组成的数组
     * @param {*} leafOnly  是否只是叶子节点，默认值为 false
     * @param {*} includeHalfChecked  是否包含半选节点，默认值为 false
     * @return {*}
    */
    getCheckedNodes(leafOnly = false, includeHalfChecked = false) {
      if (this.showCheckbox) {
        return this.$refs.treeNode.getCheckedNodes(leafOnly, includeHalfChecked);
      }
    },
    /**
     * @description: 若开启复选框（即 showCheckbox 为 true），则返回目前被选中的节点的 key 所组成的数组
     * @param {*} leafOnly  为 true 则仅返回被选中的叶子节点的 keys，默认值为 false
     * @return {*}
    */
    getCheckedKeys(leafOnly = false) {
      if (this.showCheckbox) {
        return this.$refs.treeNode.getCheckedKeys(leafOnly);
      }
    },
    /**
     * @description: 获取当前被选中节点的 data，若没有节点被选中则返回 null
     * @return {*}
    */
    getCurrentNode() {
      return this.$refs.treeNode.getCurrentNode();
    },
    /**
     * @description: 获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null
     * @return {*}
    */
    getCurrentKey() {
      return this.$refs.treeNode.getCurrentKey();
    },
  }

}
</script>

<style lang="scss" scoped>
.check-box {
  padding: 0 20px;
}

::v-deep .el-scrollbar {
  height: 280px !important;

  .el-select-dropdown__wrap {
    max-height: 280px;
    overflow-x: hidden !important;

    .el-select-dropdown__list {
      padding: 0;
      overflow: hidden !important;
    }
  }
}

.option-style {
  height: 100%;
  padding: 0 0 10px 0 !important;
  margin: 0;
  overflow-y: auto;
  cursor: default !important;
}

::v-deep .el-select-dropdown__item span {
  min-width: 14px !important;
}

::v-deep .el-tag__close {
  display: none !important;
}
</style>

