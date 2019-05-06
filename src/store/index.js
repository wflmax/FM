import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import {
  getStore
} from "@/config/utils";
Vue.use(Vuex)

const state = {
  ticketSearch: null, //机票搜索条件
  ticketList: null, //机票全局列表
  ticketRoute: [], //机票行程
  historyNumList: [], //搜索航班号记录
  historyRouteList: [], //搜索航线记录
  user_token: getStore('tv_userToken') ? getStore('tv_userToken') : '',
  app_id: getStore('tv_appId') ? getStore('tv_appId') : '',
  account_id: getStore('tv_accountId') ? getStore('tv_accountId') : '',
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
