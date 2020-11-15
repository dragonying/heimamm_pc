//登录页面
import request from '@/api/request.js';

export function userLogin(data = {}, callback = null) {
  return request({
    url: '/login',
    method: 'post',
    data: data
  }, callback, null, false)
}
// //验证码方法
export function pinCode() {
  return process.env.VUE_APP_BASEURL + '/captcha?type=login&' + Date.now();
}