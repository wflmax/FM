// RSA加密
export const nodeRSA = (publicKey, type) => {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  let data;
  if (type) {
    data = encrypt.encrypt(type);
  } else {
    data = encrypt.encrypt(window.localStorage.tv_keyID);
  }
  return data;
}
//本地随机值 16字节
const getNum = () => {
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  var nums = "";
  for (var i = 0; i < 16; i++) {
    var id = parseInt(Math.random() * 61);
    nums += chars[id];
  }
  return nums;
}
export let tv_keyID = null;
tv_keyID = getNum();


//getAes
export const getAes = (data, key) => {
  let keys = CryptoJS.enc.Utf8.parse(key);
  let encrypted = CryptoJS.AES.encrypt(data, keys, {
    iv: keys,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  let sencrypted = encrypted.toString();
  sencrypted = encodeURIComponent(sencrypted);
  return encodeURIComponent(sencrypted)
}

//解密
export const decryDes = (data, key) => {
  let keys = CryptoJS.enc.Utf8.parse(key);
  let sdata = data.toString();
      sdata = decodeURIComponent(decodeURIComponent(data));
  let encrypted = CryptoJS.AES.decrypt(sdata, keys, {
    iv: keys,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(encrypted).toString();
}

//按字母序排列加密=>Sign
export const getSign = (send_data) => {
  let data_key = Object.keys(send_data).sort();
  let token = '';
  for (let i = 0; i < data_key.length; i++) {
    token += data_key[i] + '=' + send_data[data_key[i]];
    if (i != data_key.length - 1) {
      token += '&';
    }
  }
  let key = CryptoJS.enc.Utf8.parse(window.localStorage.tv_keyID);
  let iv = CryptoJS.enc.Utf8.parse(window.localStorage.tv_keyID);
  let encrypted = CryptoJS.AES.encrypt(token, key, {
    iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  let sencrypted = encrypted.toString();
  sencrypted = encodeURIComponent(sencrypted);
  return encodeURIComponent(sencrypted)
}

if (!window.localStorage.tv_keyID) {
  window.localStorage.tv_keyID = tv_keyID;
}
let tv_bID;
if (window.localStorage.tv_bID==null) {
  tv_bID = getNum();
  window.localStorage.tv_bID = tv_bID;
} else {
  tv_bID = window.localStorage.tv_bID;
}
export {
  tv_bID
};
