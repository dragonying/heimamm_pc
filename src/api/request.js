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
        console.log('请求地址:' + option.url, res,"===============================================\n")
        typeof success == 'function' ? (res.data.code == 200 ? success(res.data.data) : (typeof failed == 'function' ? failed(res.data) : Message.error(res.data.message || res.data.msg))) : console.log(res)
    }).catch(error => console.error(error));
}

