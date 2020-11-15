//注册页面
import request from '@/utils/request.js';

export function userReg(data = {}, callback = null) {
  return request({
    url: '/register',
    method: 'post',
    data: data
  }, callback)
}
//图形验证码方法
export function smPinCode() {
  return process.env.VUE_APP_BASEURL + '/captcha?type=sendsms&' + Date.now();
}


//发送短信验证码
export function sendSms(data = {}, callback = null) {
  return request({
    url: '/sendsms',
    method: 'post',
    data: data
  }, callback, null, false)
}

//头像上传
export const upload = {
  url: process.env.VUE_APP_BASEURL + '/uploads',//上传地址
  name: 'image', //上传文件字段名
  acceptType: ['jpg', 'jpeg', 'png', 'gif'],//允许的类型
  sizeLimit: 4 * 1024 * 1024,//上传大小限制 B
}

