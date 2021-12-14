import Vue from 'vue';
import App from './App.vue';
import router from "./router/index";
import axios from "./libs/axios";
import qs from 'qs';
import shiro from '@/main/shiro';
import store from './store/index';
import lesVue from 'les-vue-plugin';
import config from "@/config/index";
import vueScroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
import '@/assets/css/common.css';
import antDesign from 'ant-design-vue';
import lesLang from "@/main/lang";
import moment from 'moment';
import VueI18n from 'vue-i18n';
import animated from 'animate.css';
import VueParticles from 'vue-particles'  
Vue.use(VueParticles);
moment.locale('zh-cn');
Vue.use(shiro);
Vue.use(antDesign);
Vue.use(lesLang);
Vue.locale = () => {};
Vue.use(vueScroll,{ops: {

}, name: 'vue-scroll'});
Vue.use(animated);
Vue.use(vueScroll);
Vue.prototype.$vuescrollConfig = {
  bar: {
    background: '#4380FE',
    opacity: .9,
    // keepShow: true,
    size: '8px'
  },
  scrollPanel:{
    scrollingX: false,
  }
};
Vue.use(lesVue,{
  ntcip: {
    username:GlobalConfig.rabbitmq.username,
    password:GlobalConfig.rabbitmq.username.password,
    url:GlobalConfig.rabbitmq.url
  }
});
Vue.use(VueI18n);// 通过插件的形式挂载，通过全局方法
const i18n = new VueI18n({
  locale:'zh',   //从localStorage里获取用户中英文选择，没有则默认中文
  messages:{
    'zh':require('./libs/lang/zh'),
    'en':require('./libs/lang/en')
  }
});
//自定义real-img指令
var imageIsExist = function (url) {
  return new Promise((resolve) => {
    let img = new Image();
    img.onload = function () {
      if (this.complete==true) {
        resolve(true)
        img=null
      }
    }
    img.onerror=function () {
      resolve(false)
      img=null
    }
    img.src=url
  })
}
Vue.directive('real-img', async function (el, binding) {
  let imgURL = binding.value
  if (imgURL) {
    let exist = await imageIsExist(imgURL)
    if (exist) el.setAttribute("src", imgURL)
  }
})
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$config = config;
Vue.prototype.$moment = moment;
Vue.prototype.$vue = Vue;
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
