/*
 * 基础通信组件
 * @Author: mikey.yuqibin
 * @Date: 2019-06-14 11:31:06
 * @Last Modified by: mikey.yuqibin
 * @Last Modified time: 2019-06-24 17:58:25
 */
import axios from 'axios'
import {
  splicingUrl
} from 'common/utils/utils'
let promiseList = []
const baseHostUrl = window.location.protocol + '//' + window.location.host
const reportAxios = axios.create({
  baseURL: process.env.baseUrl,
  timeout: process.env.TIMEOUT
})
/**
 * 获取token
 * */
function getToken () {
  let instance = axios.create({
    // 接口http使用修改 --edited by jmning 2019/1/15
    // baseURL: process.env.TOKEN_API_URL,
    // edited by qbyu2 使用baseHostUrl在开发环境不能获取到test环境的cookie,故判断一下
    baseURL: process.env.NODE_ENV,
    timeout: process.env.TIMEOUT
  })
  // POST传参序列化(添加请求拦截器)
  instance.interceptors.request.use(function (config) {
    config.headers.XToken = localStorage.getItem('xToken')
    return config
  }, (error) => {
    return Promise.reject(error)
  })
  return instance.get('/addon/error/book/index', {
    withCredentials: true
  })
}
/**
 * check token 是否过期
 * 未过期正常下一步
 * 过期则重新获取token
 * */
// eslint-disable-next-line no-unused-vars
const checkToken = function () {
  let xToken = localStorage.getItem('xToken')
  if (!xToken) {
    if (!promiseList.length) {
      let prse = new Promise((resolve, reject) => {
        getToken().then(res => {
          if (res.data.errorCode === 0) {
            localStorage.setItem('xToken', res.data.result)
            resolve()
          } else if (res.data.errorCode === 3001) {
            window.location.href = baseHostUrl + '/login.html'
          }
        }).catch(err => {
          reject(err)
          window.location.href = baseHostUrl + '/login.html'
        })
      })
      promiseList.push(prse)
    } else {
      return Promise.race(promiseList)
    }
  } else {
    return Promise.resolve()
  }
  return Promise.race(promiseList)
}
/**
 * POST传参序列化(添加请求拦截器)
 * */
// reportAxios.interceptors.request.use(function (config) {
//   config.headers.XToken = localStorage.getItem('xToken')
//   return config
// }, (error) => {
//   return Promise.reject(error)
// })
/**
 * 返回状态判断(添加响应拦截器)
 * */
// reportAxios.interceptors.response.use((res) => {
//   // 判断token是否过期
//   if (res.data.errorCode === 3001) {
//     localStorage.setItem('xToken', '')
//     window.location.href = baseHostUrl + '/login.html'
//   }
//   return res
// }, (error) => {
//   if (error.message === `timeout of ${reportAxios.defaults.timeout} ms exceeded`) {
//     console.error('请求超时，请重试！')
//   } else {
//     console.error('请求异常，请稍后重试！')
//   }
//   return Promise.reject(error)
// })
/**
 * iE9
 * */
// eslint-disable-next-line no-unused-vars
function checkIE9 () {
  let userAgent = navigator.userAgent
  let isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1
  if (isIE) {
    let reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    let fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion === 9) {
      return true
    }
  }
  return false
}
/**
 * fetchGet方法, 调用后台接口
 * fetchGet为axios.get()方法 限定长度 以需要兼容的IE为标准 长度不能超过2083字节 超过则用post方法
 * @param url：        接口地址
 * @param params：     请求参数
 * @returns {Promise}  返回一个promise
 * */
const fetchGet = function (url, params) {
  return new Promise((resolve, reject) => {
    reportAxios.get(splicingUrl(url, params || {}))
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
/**
 * fetchPost方法, 调用后台接口
 * fetchPost为axios.post()方法 限定长度 以需要兼容的IE为标准 长度超过2083字节时 使用post方法 不超过则用get方法
 * @param url：        接口地址
 * @param params：     请求参数
 * @returns {Promise}  返回一个promise
 * */
reportAxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
const fetchPost = function (url, params) {
  return new Promise((resolve, reject) => {
    reportAxios({
      method: 'post',
      url: url,
      data: params || {},
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }]
    }).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }).catch((error) => {
      reject(error)
    })
  })
}
export default {
  fetchGet: fetchGet,
  fetchPost: fetchPost
}
