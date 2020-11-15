//后台首页

import request from '@/utils/request.js';
import { Message } from 'element-ui';
import router from '@/router'

//获取用户信息
export function userInfo(callback = null) {
    return request({
        url: '/info',
        method: 'get',
    }, callback,r=>{
        //验证token的正确性
        if(r.code == 206){
            Message.error(r.message+'请重新登录');
            router.push('/login');
            return;
        }
    })
}

//登出
export function userLogout(callback = null) {
    return request({
        url: '/logout',
        method: 'get',
    }, callback)
}