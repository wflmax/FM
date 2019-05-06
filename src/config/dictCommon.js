//处理转换本地字典格式
import {
  getDict
} from "@/service/getData";
import {
  getStore,
  setStore
} from "@/config/utils";

let aaa = {
  "model_protocol": {
    "check_in": {
      "description": "值机协议",
      "value": "check_in"
    },
    "commit_order": {
      "description": "订票协议",
      "value": "commit_order"
    },
    "search_tip": {
      "description": "搜票提示协议",
      "value": "search_tip"
    }
  },
  "doc_type": {
    "disable_police": {
      "description": "警残证",
      "value": "102"
    },
    "taiwan": {
      "description": "台湾居民居住证",
      "value": "207"
    },
    "other": {
      "description": "其他证件",
      "value": "14"
    },
    "police": {
      "description": "警官证",
      "value": "7"
    },
    "soldier": {
      "description": "士兵证",
      "value": "3"
    },
    "officer": {
      "description": "军官证",
      "value": "6"
    },
    "id": {
      "description": "身份证",
      "value": "5"
    },
    "hk_mac": {
      "description": "港澳居民居住证",
      "value": "207"
    },
    "disable_millitary": {
      "description": "军残证",
      "value": "101"
    },
    "passprot": {
      "description": "有效护照",
      "value": "2"
    }
  },
  "DICT_TIMESTAMP": "1548839400",
  "dict_id_type": {
    "national_id": {
      "description": "身份证",
      "value": "5"
    },
    "passport": {
      "description": "护照",
      "value": "2"
    }
  },
  "WEATHER_TIMESTAMP": "1548839400",
  "check_in_num": "3",
  "refund_reason_type": {
    "Sickness": {
      "description": "病退",
      "value": "Sickness"
    },
    "Personal": {
      "description": "个人原因",
      "value": "Personal"
    },
    "Airline": {
      "description": "航班延误/变动",
      "value": "Airline"
    },
    "Other": {
      "description": "其他",
      "value": "Other"
    }
  },
  "app_config": {
    "app_tribe_login_timeout": {
      "description": "tribe登录超时时间",
      "value": "900"
    },
    "app_tribe_unlogin_timeout": {
      "description": "tribe未登录超时时间",
      "value": "300"
    },
    "app_token_timeout": {
      "description": "token超时时间",
      "value": "1800"
    },
    "app_flight_refresh": {
      "description": "航班查询过期时间",
      "value": "900"
    },
    "app_order_timeout": {
      "description": "订单自动取消时间",
      "value": "1500"
    }
  },
  "order_status": {
    "REFUND_SUCCESS": {
      "description": "退款成功",
      "value": "REFUND_SUCCESS"
    },
    "DRAW_SUCCESS": {
      "description": "出票成功",
      "value": "DRAW_SUCCESS"
    },
    "REFUND_REFUSE": {
      "description": "退票拒绝",
      "value": "REFUND_REFUSE"
    },
    "REFUND_WAIT": {
      "description": "退款中",
      "value": "REFUND_WAIT"
    },
    "DRAW_WAIT": {
      "description": "等待出票",
      "value": "DRAW_WAIT"
    },
    "REFUND_FALSE": {
      "description": "退款失败",
      "value": "REFUND_FALSE"
    },
    "REFUND_ADJUSTMENTREPAY_WAIT": {
      "description": "补退款退款等待",
      "value": "REFUND_ADJUSTMENTREPAY_WAIT"
    },
    "ORDER_CANCEL": {
      "description": "订单取消",
      "value": "ORDER_CANCEL"
    },
    "OPEN": {
      "description": "已改不定期",
      "value": "OPEN"
    },
    "REFUND_ADJUSTMENTREPAY_SUCCESS": {
      "description": "补退款退款成功",
      "value": "REFUND_ADJUSTMENTREPAY_SUCCESS"
    },
    "REFUND_ADJUSTMENTREPAY_APPROVE": {
      "description": "补退款退款审核",
      "value": "REFUND_ADJUSTMENTREPAY_APPROVE"
    },
    "REFUND_ADJUSTMENTREPAY_REFUSE": {
      "description": "补退款退款拒绝",
      "value": "REFUND_ADJUSTMENTREPAY_REFUSE"
    },
    "PAY_WAIT": {
      "description": "等待支付",
      "value": "PAY_WAIT"
    },
    "UNKONW": {
      "description": "未知",
      "value": "UNKONW"
    }
  }
}

let model_protocol = null,
  doc_type = null,
  dict_id_type = null,order_status=null,app_config=null;

  const getDictList = () => {
    let obj = {};
    let tv_reset = getStore('tv_reset');
    if (!tv_reset || tv_reset == 1) {
      if (getStore('tv_dict_timestamp') != null) {
        obj = {
          'dictTimeStamp': getStore('tv_dict_timestamp')
        }
      }
      let params = {
        'strValue': obj
      }
      getDict(params).then(res => {
        if (res.statusCode == 0) {
          if (res.data.value == null || !res.data.value) {
            return;
          }
          setStore('tv_dict', res.data.value);
          setStore('tv_dict_timestamp', res.data.value.DICT_TIMESTAMP);
        }
      })
    } else {

    }

  }
export {
  getDictList
};
