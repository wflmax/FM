import Vue from 'vue'
import Router from 'vue-router'
import {routerMode} from '../config/env'
Vue.use(Router)
const airlineSeasonal = r => require.ensure([], () => r(require('@/pages/airlineSeasonal/index')), 'index')
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: airlineSeasonal,
      // meta: { keepAlive: true }
    }

  ],
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  },
})

