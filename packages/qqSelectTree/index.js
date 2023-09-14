import qqSelectTree from './qqSelectTree.vue'
// 为组件添加 install 方法，用于按需引入
qqSelectTree.install = function (Vue) {
  Vue.component(qqSelectTree.name, qqSelectTree)
}
export default qqSelectTree;
