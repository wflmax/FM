import http from './http'

export default {
  // 查询两个地点之间的全部数据
  getAirRailData: params => {
    return http.fetchGet('AiRail/search/data', params)
  },
  // 反馈接口
  setFeedBack: params => {
    return http.fetchPost('AiRail/feedback/add', params)
  }
}
