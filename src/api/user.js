//学科列表

import request from '@/utils/request.js';


//列表数据
export function getUserList(data = {}, callback = null) {
    return request({
        url: '/user/list',
        method: 'post',
        data: data
    }, callback)
}



//删除
export function delUser(data = {}, callback = null) {
    return request({
        url: '/user/del',
        method: 'post',
        data: data
    }, callback)
}



