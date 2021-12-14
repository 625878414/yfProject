import shiro from './shiro.vue';
import disabled from './disabled.vue';
const component = {
  install:function(Vue){
    Vue.component('shiro-hasPermission',shiro);
    Vue.component('shiro-hasDisabled',disabled);
  }  //'component-name'这就是后面可以使用的组件的名字，install是默认的一个方法
};
// 导出该组件
export default component
