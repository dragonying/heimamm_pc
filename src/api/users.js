//学科列表

import request from '@/utils/request.js';


//列表数据
export function getUserList(data = {}, callback = null) {
    return request({
        url: '/user/list',
        method: 'get',
        params: data
    }, callback)
}

//更改状态
export function setStatus(data = {}, callback = null) {
    return request({
        url: '/user/status',
        method: 'post',
        data: data
    }, callback)
}

//删除
export function delUser(data = {}, callback = null) {
    return request({
        url: '/user/remove',
        method: 'post',
        data: data
    }, callback)
}
//新增
export function addUser(data = {}, callback = null) {
    return request({
        url: '/user/add',
        method: 'post',
        data: data
    }, callback)
}
//编辑
export function editorUser(data = {}, callback = null) {
    return request({
        url: '/user/edit',
        method: 'post',
        data: data
    }, callback)
}

//详情
export function getInfo(data = {}, callback = null) {
    return request({
        url: '/subject/info',
        method: 'get',
        params: data
    }, callback)
}