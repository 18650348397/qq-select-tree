<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank"
          rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank"
          rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a>
      </li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
    <h3>测试qqSelectTree组件</h3>
    <qq-select-tree style="display: inline-block;width: 250px;" v-model="search.unitId" :checkStrictly="checkStrictly"
      ref="mytree" showSubset isOnlySelected :options="companys" :defaultProps="defaultProps"
      @changeCheckStrictly="changeCheckStrictly" placeholder="请选择单位">
    </qq-select-tree>
    <el-button type="primary" @click="handleSearch">搜索</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
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
      checkStrictly: false
    }
  },
  created() {
    this.getTreeData();

  },
  methods: {
    //同步父子是否关联情况
    changeCheckStrictly(val) {
      this.checkStrictly = val;
    },
    //搜索
    handleSearch() {
      console.log('unitId', this.search.unitId);
      console.log('unitIds', this.search.unitIds);
      let checkedNodes = this.$refs.mytree.getCheckedNodes();
      let checkedKeys = this.$refs.mytree.getCheckedKeys();
      let currentNode = this.$refs.mytree.getCurrentNode();
      let currentKey = this.$refs.mytree.getCurrentKey();
      console.log('方法', checkedNodes, checkedKeys, currentNode, currentKey);
    },
    //获取选择树数据（这里直接用模拟生成的数据，实际业务以后端接口请求为准）
    getTreeData() {
      this.companys = [
        {
          "unitName": "福建省",
          "bstatus": false,
          "unitId": "1",
          "status": 1,
          "children": [
            {
              "unitName": "福州市",
              "bstatus": false,
              "unitId": "11",
              "status": 1,
              "children": [
                {
                  "unitName": "鼓楼区",
                  "bstatus": false,
                  "unitId": "111",
                  "status": 1,
                  "children": [
                    {
                      "unitName": "杨桥街道",
                      "bstatus": false,
                      "unitId": "1111",
                      "status": 1,
                      "children": [
                        {
                          "unitName": "星城国际",
                          "bstatus": false,
                          "unitId": "11111",
                          "status": 1,
                        }
                      ]
                    },
                    {
                      "unitName": "五凤街道",
                      "bstatus": false,
                      "unitId": "1112",
                      "status": 1,
                      "children": [
                        {
                          "unitName": "丞相坊",
                          "bstatus": false,
                          "unitId": "11121",
                          "status": 1,
                          "children": [
                            {
                              "unitName": "8号楼",
                              "bstatus": false,
                              "unitId": "111211",
                              "status": 1,
                              "children": [
                                {
                                  "unitName": "1001",
                                  "bstatus": false,
                                  "unitId": "1112111",
                                  "status": 1,
                                },
                                {
                                  "unitName": "1908",
                                  "bstatus": false,
                                  "unitId": "1112112",
                                  "status": 1,
                                }
                              ]
                            },
                            {
                              "unitName": "13号楼",
                              "bstatus": false,
                              "unitId": "111212",
                              "status": 1,
                            }
                          ]
                        },
                        {
                          "unitName": "凤舞山庄",
                          "bstatus": false,
                          "unitId": "11122",
                          "status": 1,
                        }
                      ]
                    }
                  ]
                },
                {
                  "unitName": "台江区",
                  "bstatus": false,
                  "unitId": "112",
                  "status": 1,
                },
                {
                  "unitName": "晋安区",
                  "bstatus": false,
                  "unitId": "113",
                  "status": 1,
                },
                {
                  "unitName": "仓山区",
                  "bstatus": false,
                  "unitId": "114",
                  "status": 1,
                },
              ]
            }
          ]
        },
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
