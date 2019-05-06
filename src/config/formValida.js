const validaRule = {

  /* 身份证
     规则： 份证18位编码规则
   */
  rightCard: function (idCard) {
    if (/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard) && this.ValidityBirth(idCard)) {
      return true;
    }
    return false;
  },

  /* 验证身份证年月日 18位*/
  ValidityBirth: function (idCard) {
    let year = idCard.substr(6, 4), //身份证年
      month = idCard.substr(10, 2), //身份证月
      day = idCard.substr(12, 2), //身份证日
      now_date = new Date(year, parseFloat(month) - 1, parseFloat(day)); //当前时间
    if (now_date.getFullYear() != parseFloat(year) || now_date.getMonth() != parseFloat(month) - 1 || now_date.getDate() != parseFloat(day)) {
      return false;
    }
    return true;
  },
  /* 独立日期*/
  date: function (date) {
    let year = date.substr(0, 4), //身份证年
      month = date.substr(6, 7), //身份证月
      day = date.substr(9, 10), //身份证日
      now_date = new Date(year, parseFloat(month) - 1, parseFloat(day)); //当前时间
    if (now_date.getFullYear() != parseFloat(year) || now_date.getMonth() != parseFloat(month) - 1 || now_date.getDate() != parseFloat(day)) {
      return false;
    }
    return true;
  },
  /** 判断身份证号码为18位时最后的验证位是否正确*/
  isTrueCodeBy18: function (idCard) {
    // idCard = trim(idCard.replace(/ /g, ""));
    let a_iaCard = idCard.split("");
    let Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
    let ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X
    let sum = 0; // 声明加权求和变量 
    if (a_iaCard[17].toLowerCase() == 'x') {
      a_iaCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
    }

    for (let i = 0; i < 17; i++) {
      sum += Wi[i] * a_iaCard[i]; // 加权求和
    }
    let valCodePosition = sum % 11; // 得到验证码所位置
    if (a_iaCard[17] == ValideCode[valCodePosition]) {
      return true;
    } else {
      return false;
    }
  },

  /* 其他证件
   */
  otherCard: function (otherCard) {
    return /^(?![A-Za-z]+$)[a-zA-Z0-9]{4,15}$/.test(otherCard);
  },

  //11位手机号
  rightPhone: function (phone) {
    return /^1[3456789]\d{9}$/.test(phone);
  },
  //邮政编码
  rightPostCode: function (phone) {
    return /^[1-9]\d{5}$/.test(phone);
  },

  //航班号
  rightFlight: function (flightCode) {
    return /^[0-9A-Za-z]{3,4}$/.test(flightCode);
  },

  //密码
  rightPassWard: function (passwrad) {
    return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(passwrad);
  },

  //邮箱
  rightEmail: function (email) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email);
  },

  //姓名
  rightNameEN: function (name) {
    return /^[a-zA-Z]+$/.test(name)
  },

  rightNameCN: function (name) {
    return /^[\u4e00-\u9fa5]+$/.test(name)
  },
  //用户名
  rightUserName: function (name) {
    let namesSr = name.substr(0, 1);
    if (!validaRule.rightNameEN(namesSr)) {
      return false;
    }
    return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(name);
  },
}
export default validaRule
