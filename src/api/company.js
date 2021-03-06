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

//删除企业
export function delCompany(data={},callback = null) {
    return request({
        url: '/enterprise/remove',
        method: 'post',
        data:data
    }, callback)
}

//新增企业
export function addCompany(data={},callback = null) {
    return request({
        url: '/enterprise/add',
        method: 'post',
        data:data
    }, callback)
}

//编辑企业
export function editCompany(data={},callback = null) {
    return request({
        url: '/enterprise/edit',
        method: 'post',
        data:data
    }, callback)
}

//详情
export function getInfo(data={},callback = null) {
    return request({
        url: '/enterprise/info',
        method: 'get',
        params:data
    }, callback)
}