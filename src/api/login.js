//引入axios
import axios from 'axios'

// 相当于axios副本
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,//设置基地址
  withCredentials: true, //配置接收cookie
});

export function userLogin(data = {}) {
  return instance.post('/login', data);
}

export function pinCode() {
  return process.env.VUE_APP_BASEURL + '/captcha?type=sendsms&v=' + Math.random();
}