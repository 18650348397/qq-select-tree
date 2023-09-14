### qq-select-tree 组件说明



#### 项目简介
- 基于Element UI封装的树形下拉选择器组件
- Element基础组件： Select、Option、Tree、Checkbox、Button、Loading、Message
- Element基础组件样式：element-ui/lib/theme-chalk/index.css
- 主要功能包括：树形下拉选择器的单选、多选、全选、清空、编辑、搜索、父子层级联动切换、最终输出数据切换等


#### 注意点
- nodejs版本    =>    v14.17.4
- vue版本   =>    v2.6.11
- element-ui版本    =>    v2.15.14
- sass版本    =>    v1.26.5
- sass-loader版本   =>    v1.26.5
- 使用该组件时，必须先安装Element UI依赖并在入口文件main.js中引入（可按需引入）
- Element UI必须组件为：Select、Option、Tree、Checkbox、Button、Loading、Message
- Element UI必须样式文件为：element-ui/lib/theme-chalk/index.css
- 示例（按需引入）：
    ```javascript
    import 'element-ui/lib/theme-chalk/index.css'
    import {Select, Option, Tree, Checkbox, Button, Loading, Message} from 'element-ui'
    const elements = [Select, Option, Tree, Checkbox, Button, Loading]
    for(let item of elements){
      Vue.use(item)
    }
    Vue.prototype.$message = Message
    ```

#### 使用方式

1. 安装依赖：
  ```javascript
  npm install qq-select-tree --save
  ```

2. 入口文件main.js中导入并使用
  ```javascript
  import qqSelectTree from 'qq-select-tree'
  import 'qq-select-tree/lib/qq-select-tree.css'
  Vue.use(qqSelectTree)
  ```

3. 具名文件中使用（案例）
  ```html
  <qq-select-tree style="display: inline-block;width: 250px;" v-model="search.unitId" :checkStrictly="checkStrictly"
    showSubset isOnlySelected :options="companys" :defaultProps="defaultProps"
    @changeCheckStrictly="changeCheckStrictly" placeholder="请选择单位">
  </qq-select-tree>
  ```
  ```javascript
  data() {
    return {
      search: {
        unitIds: [],  //多选
        unitId: ''    //单选
      },
      companys: [], //单位集合
      defaultProps: {
        children: 'children',
        label: 'unitName',
        value: 'unitId',
        disabled: true
      },
      parentValue: 'unitId',
      checkStrictly: false
    }
  },

  //同步父子是否关联情况
  changeCheckStrictly(val) {
    this.checkStrictly = val;
  },
  ```


#### 技术说明

- [Vue 2.6.11](https://cn.vuejs.org/)
- [ES6](http://es6.ruanyifeng.com/)
- [element-ui 2.15.14](https://element.eleme.io/#/zh-CN)


#### 参数说明

##### Attributes

| 参数 | 状态 | 说明 | 类型 | 可选值 | 默认值 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| value / v-model     | 必传    | 绑定值    | string/number/array     | —     | —     |
| options     | 必传    | 选项的数据数组    | array     | —     | —     |
| defaultProps     | 必传    | 配置选项，详见下表    | object     | —     | —     |
| defaultNodeKey     | 无复选框且有编辑功能时，必传    |  无复选框编辑时回显的数据    | string/number     | —     | —     |
| defaultValue     | 有复选框且有编辑功能时，必传    |  有复选框编辑时回显的数据（需更新checkStrictly状态，详见下文）    | array     | —     | —     |
| appendToBody     | 非必传    |  是否将组件添加到body上面（组件在弹窗或者表格里面时可设为true）    | boolean     | —     | false     |
| filterable     | 非必传    |  是否可搜索    | boolean     | —     | true     |
| disabledSelect     | 非必传    |  是否禁用下拉框    | boolean     | —     | false     |
| showCheckbox     | 非必传    |  节点是否可被勾选（是否开启复选框）    | boolean     | —     | true     |
| showSubset     | 非必传    |  在显示复选框的情况下，是否开启切换父子关联功能的展示，如果开启，需同时定义 changeCheckStrictly 事件（详见下表）。    | boolean     | —     | false     |
| sunSetText     | 非必传    |  可切换父子关联功能的展示文字    | string     | —     | '父子互相关联'     |
| checkStrictly     | 有复选框时必传    |  在显示复选框的情况下，是否严格的遵循父子不互相关联的做法（有编辑功能时，defaultValue赋值前后需更新其状态，详见下文）    | boolean     | —     | false（即：父子关联）     |
| isOnlySelected     | 非必传    |  最终的输出数据是否只需要输出已勾选（不含半选）的项    | boolean     | —     | false（即：父子（半选，勾选）都输出）     |
| isCanDelete     | 非必传    |  回显的值是否可被删除    | boolean     | —     | true     |
| placeholder     | 非必传    |  提示信息    | string     | —     | 请选择     |
| errMessage     | 非必传    |  不可删除的提示信息    | string     | —     | 该选项不可被删除     |
| showAllTreeNode     | 非必传    |  是否展开所有节点    | boolean     | —     | false     |

##### defaultProps
| 参数 | 状态 | 说明 | 类型 | 可选值 | 默认值 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| children | 必传    | 指定子树为节点对象的某个属性值 | string | —   | children  |
| label | 必传    | 指定节点标签为节点对象的某个属性值 | string, function(data, node) | —   | label  |
| value | 必传    | 有复选框时，必须指定当前数据对象的父级id（即：每个树节点用来作为唯一标识的属性，整棵树应该是唯一的） | string | —   | value  |

##### 方法
| 方法名 | 说明 | 注意点 | 参数 |
| -------- | -------- | -------- | -------- |
| getCheckedNodes | 若开启复选框（即 showCheckbox 为 true），则返回目前被选中的节点所组成的数组 | 需给 qq-select-tree 添加ref属性 | 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false |
| getCheckedKeys | 若开启复选框（即 showCheckbox 为 true），则返回目前被选中的节点的 key 所组成的数组 | 需给 qq-select-tree 添加ref属性 | 接收一个 boolean 类型的参数，若为 true 则仅返回被选中的叶子节点的 keys，默认值为 false |
| getCurrentNode | 获取当前被选中节点的 data，若没有节点被选中则返回 null | 需给 qq-select-tree 添加ref属性 |  |
| getCurrentKey | 获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null | 需给 qq-select-tree 添加ref属性 |  |

##### Events
| 事件名称 | 说明 | 回调参数 |
| -------- | -------- | -------- |
| changeCheckStrictly | 在显示复选框的情况下，开启切换父子关联功能的展示（ showCheckbox 和 showSubset 均为true）时，切换父子关联功能时的回调 | 共一个参数，参数为当前树的父子是否关联 |


#### 编辑功能注意点
- 有复选框且有编辑功能时， defaultValue 赋值前后需更新 checkStrictly 状态。
- 示例（编辑功能时，获取defaultValue值）：
    ```javascript
    viewRole(id) {
      let data = new Object();
      data.roleId = id;
      this.checkStrictly = true;
      API.viewRole(data).then((res) => {
        this.defaultValue = res.data.authIds || [];
        setTimeout(() => {
          this.checkStrictly = false;
        },500)
      });
    },
    ```

