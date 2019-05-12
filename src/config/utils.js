import
airlineGps
  from "@/service/airlineDict";
import
cityGps
  from "@/service/cityDict";
import stationGps
  from "@/service/stationDict";

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

/**
 * 删除sessionStorage
 */
export const removeSessionStore = name => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
}


/**
 * 存储sessionStorage
 */
export const setSessionStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
}
/**
 * 获取sessionStorage
 */
export const getSessionStore = name => {
  if (!name) return;
  return window.sessionStorage.getItem(name);
}

//string 转时间格式
export const coverMin = (min) => {
  let h = min / 60;
  let m = min % h;
  let s = h.toFixed(0) + '小时';
  if (m.toFixed(0) != 0) {
    s += m.toFixed(0) + '分钟';
  }
  return s;
}



/**
 * 航司二字码对应表
 */

export const airlineCoord = {
  coord: function (code) {
    if (airlineGps[code]) {
      return airlineGps[code];
    }
  },
  name: function (code) {
    return this.coord(code)[0];
  },
}

/**
 * 城市对应字典数据
 */

export const cityCoord = {
  coord: function (code) {
    if (cityGps[code]) {
      return cityGps[code];
    }
  },
  name: function (code) {
    return this.coord(code)[0];
  },
  lng: function (code) {
    return this.coord(code)[1];
  },
  lat: function (code) {
    return this.coord(code)[2];
  },
}


/**
 * 机场,车站字段查询
 * 机场,车站三字码键值表
 */

export const stationCoord = {
  coord: function (type, code) {
    if (stationGps[type][code]) {
      return stationGps[type][code];
    }
  },
  coords: function (type, code) {
    let cood=this.coord(type, code);
    return [cood[1],cood[2]];
  },
  lng: function (type, code) {
    return this.coord(type, code)[1];
  },
  lat: function (type, code) {
    return this.coord(type, code)[2];
  },
  name: function (type, code) {
    return this.coord(type, code)[0];
  },
  city: function (type, code) {
    return cityCoord.name(this.coord(type, code)[3]);
  },
}
