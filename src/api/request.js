//引入axios
//封装请求
import axios from 'axios'
import { Message } from 'element-ui';


// 相当于axios副本
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,//设置基地址
    withCredentials: true, //配置接收cookie
});


export default function (option = {}, success = null, failed = null) {
    return instance(option).then(res => {
        console.log(res)
        typeof success == 'function' ? (res.data.code == 200 ? success(res.data.data) : (typeof failed == 'function' ? failed(res.data.data) : Message.error(res.data.message || res.data.msg))) : console.log(res)
    }).catch(error => console.error(error));
}

