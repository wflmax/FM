import
airlineGps
  from '@/service/airlineDict'
import
cityGps
  from '@/service/cityDict'
import stationGps
  from '@/service/stationDict'

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 删除sessionStorage
 */
export const removeSessionStore = name => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}

/**
 * 存储sessionStorage
 */
export const setSessionStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}
/**
 * 获取sessionStorage
 */
export const getSessionStore = name => {
  if (!name) return
  return window.sessionStorage.getItem(name)
}
/**
 * 转换时间
 */
export const coverMin = (min) => {
  let h = min / 60
  let m = min % 60
  let s = h.toFixed(0) + '小时'
  if (m.toFixed(0) != 0) {
    s += m.toFixed(0) + '分钟'
  }
  return s
}

const dateToTimestamp = (date) => {
  date = new Date(date)
  return date.valueOf()
}

/**
 * 行程时间
 */
export const routeTime = (dep, arr) => {
  dep = dateToTimestamp(dep)
  arr = dateToTimestamp(arr)
  let cost = (arr - dep) / 60000
  cost = coverMin(cost)
  return cost
}
/**
 * 格式日期
 */
export const formatDay_zh = (date, type) => {
  date = date.split(' ')
  let d = date[0].split('-')
  if (type == 'arrTime') {
    return d[2] + '日' + date[1].slice(0, 5)
  }
  if (type == 'line') {
    return d[1] + '-' + d[2]
  }
  return d[1] + '月' + d[2] + '日'
}
/**
 * 格式化星期
 */
export const formatWeekday = (date) => {
  let w = ''
  var cDate = new Date(date)
  switch (cDate.getDay()) {
    case 0:
      w = '周日'
      break
    case 1:
      w = '周一'
      break
    case 2:
      w = '周二'
      break
    case 3:
      w = '周三'
      break
    case 4:
      w = '周四'
      break
    case 5:
      w = '周五'
      break
    case 6:
      w = '周六'
      break
  }
  return w
}

/**
 * 航司二字码对应表
 */

export const airlineCoord = {
  name: function (code) {
    return airlineGps[code][0]
  }
}

/**
 * 城市对应字典数据
 */

export const cityCoord = {
  coord: function (code) {
    if (cityGps[code]) {
      return cityGps[code]
    }
  },
  name: function (code) {
    return this.coord(code)[0]
  },
  level: function (code) {
    return (this.coord(code) && this.coord(code)[1]) || 999
  }
}

/**
 * 机场,车站字段查询
 * 机场,车站三字码键值表
 */

export const stationCoord = {
  coord: function (type, code) {
    if (stationGps[type][code]) {
      return stationGps[type][code]
    }
  },
  coords: function (type, code) {
    let cood = this.coord(type, code)
    return [cood[1], cood[2]]
  },
  lng: function (type, code) {
    return this.coord(type, code)[1]
  },
  lat: function (type, code) {
    return this.coord(type, code)[2]
  },
  name: function (type, code) {
    return this.coord(type, code)[0]
  },
  city: function (type, code) {
    return cityCoord.name(this.coord(type, code)[3])
  }
}
