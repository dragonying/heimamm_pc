//企业列表

import request from '@/utils/request.js';


//面板数据
export function getCompanyList(data={},callback = null) {
    return request({
        url: '/enterprise/list',
        method: 'get',
        params:data
    }, callback)
}

//更改状态
export function setStatus(data={},callback = null) {
    return request({
        url: '/enterprise/status',
        method: 'post',
        data:data
    }, callback)
}

export function delCompany(data={},callback = null) {
    return request({
        url: '/enterprise/remove',
        method: 'post',
        data:data
    }, callback)
}