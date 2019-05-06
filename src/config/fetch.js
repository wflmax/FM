import {
  baseUrl,
  webUrl
} from './env';
import {
  getSign
} from "./encrypt";
import {

} from "@/config/utils";
import {
  Dialog
} from 'vant'
import {
  sysErrorCode,
} from "@/service/getData";

let useDebug=window.localStorage.getItem('tv_useDebug');

//机票操作提醒
const ticketWarn = () => {
  Dialog.alert({
    message: '由于您长时间未操作，机票可能发生变化',
    confirmButtonText: '返回首页',
  }).then(() => {
    window.location.href = webUrl
    return false;
  })

}
//登录过期提醒
const commonWarn = () => {
  Dialog.alert({
    message: '由于您长时间未操作，登录已过期',
    confirmButtonText: '重新登录',
  }).then(() => {
    loginClear();
    loginToken('expire');
    return false;
  })

}
export default async (url = '', option = {}, type = 'POST', method = 'fetch') => {
  type = type.toUpperCase();
  url = baseUrl + url;
  let data = option.data;
  let timeOut=option.timeOut || 45
  let timeDiff = Number(getStore('tv_timediff'));
  data['timestamp'] = Date.parse(new Date()) / 1000 - timeDiff;
  //前置判断过期时间
  if (getSessionStore('tv_preTime') != null && url.indexOf('token') == -1) {
    let tv_preTime = getSessionStore('tv_preTime');
    if (data['timestamp'] - tv_preTime > 300 && option.needCheck) {
      ticketWarn();
      return false;
    } else if (data['timestamp'] - tv_preTime > 890) {
      commonWarn();
      return false;
    }

  }
  if (option.noSign === undefined) {
    data['token'] = getStore('tv_token');
    data['strValue'] = JSON.stringify(data['strValue']);
    data['sign'] = getSign(data);
  }
  if (type == 'GET') {
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  }

  if (window.fetch && method == 'fetch') {
    let requestConfig = {
      // credentials: 'include',
      method: type,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: "cors",
      cache: "no-cache"
    }
    if (type == 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }
    const mainRequest=new Promise((resolve, reject) => {
      const ret = {
        status: 0,
        data: null,
        raw: '',
        message: ''
      };
      let asJson;

      fetch(url, requestConfig).then(res => {
        //检查返回内容类型
        const contentType = res.headers.get('content-type');
        asJson = (contentType && /\/json\b/i.test(contentType));
        ret.status = res.status;

        return res.text();
      }).then(raw => {
        ret.raw = raw;
        if (raw) {
          ret.data = asJson ? JSON.parse(raw) : raw;
        }
        if (useDebug!=null) {
          console.log(ret.data)
        }
        if (ret.status >= 200 && ret.status < 300) {
          if (ret.data.statusCode == 0) {
            setSessionStore('tv_preTime', data['timestamp']);
          } else if (ret.data.statusCode == '-103') { //重新获取token
            Dialog.alert({
              message:'正在自动登录...',
            }).then(() => {
              loginClear();
              loginToken('expire');
              return false;
            })

          }else if (sysErrorCode.includes(ret.data.statusCode)) { //系统异常
            if(ret.data.statusCode == '-111'){ //微信信息创建失败
                Dialog.alert({
                  message: ret.data.statusMsg,
                }).then(() => {
                  getOAuthCodeUrl(); //授权重定向地址
                  return false;
                })
            }else{
              Dialog.alert({
                message: '系统异常',
                confirmButtonText: '返回首页',
              }).then(() => {
                window.location.href = webUrl
                return false;
              })
            }

          }
          resolve(ret.data);
        } else {
          //非200状态下的错误，采用返回JSON中的错误信息，此信息来自rest接口内的Exceptions
          const message = typeof (ret.data) == 'object' ? ret.data.statusMsg : '';
          throw new Error(message);
        }
      }).catch(e => {
        ret.message = e.message;
        resolve(ret.data);
      });
    });

    return mainRequest;


  } else {
    return new Promise((resolve, reject) => {
      let requestObj;

      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject;
      }

      let sendData = '';
      if (type == 'POST') {
        sendData = JSON.stringify(data);
      }

      requestObj.open(type, url, true);
      requestObj.setRequestHeader("Content-type", "application/json;charset=UTF-8");
      requestObj.send(sendData);

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          if (requestObj.status == 200) {
            if (url.indexOf('mlogin') != -1) { //登录失效
              console.log(' use xhr!!!!');
            }
            let responseJsonobj = requestObj.response
            if (typeof obj !== 'object') {
              responseJsonobj = JSON.parse(responseJsonobj);
            }

            resolve(responseJsonobj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
