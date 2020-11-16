//引入axios
//封装请求
import axios from 'axios'
import { Message } from 'element-ui';
import token from '@/utils/token';
import router from '@/router'


// 相当于axios副本
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,//设置基地址
    withCredentials: true, //配置接收cookie
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    if(response.data.code == 206){
        Message.error('token有误，请重新登录');
        router.push('/login');
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

/**
 * 请求方法
 * @param {*} option 属性
 * @param {*} success 成功方法
 * @param {*} failed 失败方法
 * @param {*} needToken 是否需要token
 */
export default function (option = {}, success = null, failed = null, needToken = true) {
    if (needToken) {
        let userToken = token.getToken();
        if (!userToken) {
            Message.warning('您还未登录,请先登录！');
            //没有token跳转登录页
            router.push('/login');
            return;
        }
        option.headers = { 'token': userToken }
    }
    return instance(option).then(res => {
        console.log('请求地址:' + option.url, res, "===============================================\n")
        typeof success == 'function' ? (res.data.code == 200 ? success(res.data.data) : (typeof failed == 'function' ? failed(res.data) : Message.error(res.data.message || res.data.msg))) : console.log(res)
    }).catch(error => console.error(error));
}

