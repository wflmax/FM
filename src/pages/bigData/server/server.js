import http from 'api/http'

// xx
export const getTotalData = () => {
  return http.fetchGet('screen/beijing/totalData')
}

// xx
export const getSchedule = () => {
  return http.fetchGet('screen/beijing/schedule')
}
// xx
export const getFlow = () => {
  return http.fetchGet('screen/beijing/flow')
}
// xx
export const getScore = () => {
  return http.fetchGet('screen/beijing/score')
}
