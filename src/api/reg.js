import request from '@/api/request.js';

export function userReg(data = {}, callback = null) {
  return request({
    url: '/login',
    method: 'post',
    data: data
  }, callback)
}
// //验证码方法
export function smPinCode() {
  return process.env.VUE_APP_BASEURL + '/captcha?type=sendsms&' + Date.now();
}