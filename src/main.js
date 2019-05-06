import Vue from 'vue'
import App from './App'
import store from './store/'
import router from './router/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>',
})
router.afterEach((to, from) => {
  //非菜单token失效重定向进来页面后创建用户信息
  let url = window.location.href;
  if (url.indexOf('forceToken') == -1 && url.indexOf('code')!= -1) {
    getWxUser('no-menu');
  }
});
