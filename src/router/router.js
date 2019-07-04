import Vue from 'vue'
import Router from 'vue-router'
import {routerMode} from '../config/env'
import OtherPage from '../pages/other-page/other-page.vue'
Vue.use(Router)

const index = r => require.ensure([], () => r(require('@/pages/index/index')), 'index')
const bigData = r => require.ensure([], () => r(require('@/pages/bigData/index')), 'index')

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
      // meta: { keepAlive: true }
    }, {
      path: '/',
      name: 'bigdata',
      component: bigData
      // meta: { keepAlive: true }
    }, {
      path: '/other-page',
      name: 'other-page',
      component: OtherPage
    }
  ],
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  }
})
