import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import 'element-ui/lib/theme-chalk/index.css';
import {Select, Option, Tree, Checkbox, Button, Loading, Message} from 'element-ui';
const elements = [Select, Option, Tree, Checkbox, Button, Loading];
for(let item of elements){
   Vue.use(item);
}
Vue.prototype.$message = Message;

//导入组件
import qqSelectTree from "../packages";
//使用
Vue.use(qqSelectTree)

new Vue({
  render: h => h(App),
}).$mount('#app')
