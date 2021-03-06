import fetch from '../config/fetch'

//接口系统报错码 一律返回模块首页 fetch 处理
export const sysErrorCode =['-999','-1','-111'];


/////////////////APP基础//////////////////////
// 登陆-获取公钥和token
export const commonToken = (param) => fetch('/api/token',{noSign:0,data:param});
//设置AES
export const aeslogin = (param) => fetch('/api/token/aes',{noSign:0,data:param});
//清除totken
export const clearToken = (param) => fetch('/api/token/clear',{data:param});


//首页
//获取全部数据
export const getIndexData = (param) => fetch('/api/data',{data:param});

export const getsSeasonData = (param) => fetch('airline/season',{data:param},'GET');
export const getEasyData = (param) => fetch('airline/easy',{data:param},'GET');
