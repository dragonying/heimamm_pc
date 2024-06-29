//后台首页
import request from '@/utils/request.js';


//获取用户信息
export function userInfo(callback = null) {
    return request({
        url: '/info',
        method: 'get',
    }, callback)
}

//登出
export function userLogout(callback = null) {
    return request({
        url: '/logout',
        method: 'get',
    }, callback)
}

export function browserConf(data = {}, callback = null) {
    return request({
        url: '/browserConf',
        method: 'post',
        data: data
    }, callback)
}
