import * as types from './mutation-types.js'
import {
  setStore,
  setSessionStore
} from '../config/utils'
export default {
  //历史航班号
  [types.FLIGHT_CODE_HISTORY](state, params) {
    // 改变 state
    let historyNumList = state.historyNumList;
    if (historyNumList.length > 0) { // 有数据的话 判断
      if (historyNumList.indexOf(params) !== -1) { // 有相同的，先删除 再添加 
        historyNumList.splice(historyNumList.indexOf(params), 1)
        historyNumList.unshift(params)
      } else { // 没有相同的 添加
        historyNumList.unshift(params)
      }
    } else { // 没有数据 添加
      historyNumList.unshift(params)
    }
    if (historyNumList.length > 6) { // 保留六个值
      historyNumList.pop()
    }
    state.historyNumList = historyNumList;
    setStore('tv_flightList', JSON.stringify(historyNumList))
  },

  //历史航线
  [types.FLIGHT_ROUTE_HISTORY](state, params) {
    // 改变 state
    let historyRouteList = state.historyRouteList;
    if (historyRouteList.length > 0) { // 有数据的话 判断
      let find = false,
        index = -1;
      for (let i = 0; i < historyRouteList.length; i++) {
        let item = historyRouteList[i];
        if (item['key'] == params['key']) {
          find = true;
          index = i;
        }
      }
      if (find) { // 有相同的，先删除 再添加 
        historyRouteList.splice(index, 1)
        historyRouteList.unshift(params)
      } else { // 没有相同的 添加
        historyRouteList.unshift(params);
      }

    } else { // 没有数据 添加
      historyRouteList.unshift(params)
    }
    if (historyRouteList.length > 6) { // 保留六个值
      historyRouteList.pop()
    }
    state.historyRouteList = historyRouteList;
    setStore('tv_routeList', JSON.stringify(historyRouteList))
  },

  //token
  [types.SET_TOKEN](state, token) {
    state.user_token = token;
    setStore('tv_userToken', token);
  },

  //accountId
  [types.SET_ACCOUNT_ID](state, aid) {
    state.account_id = aid;
    setStore('tv_accountId', aid);
  },
  //appId
  [types.SET_APP_ID](state, appid) {
    state.app_id = appid;
    setStore('tv_appId', appid);
  },
	//机票
	[types.TICKET_SEARCH](state, ticketSearch) {
    state.ticketSearch = ticketSearch;
	},
	[types.TICKET_LIST](state, ticketList) {
    state.ticketList = ticketList;
    setSessionStore('tv_ticketList', ticketList);
	},
	[types.TICKET_ROUTE](state, ticketRoute) {
    state.ticketRoute = ticketRoute;
    setSessionStore('tv_ticketRoute', ticketRoute);
  },
}
