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

export function getGroupOptions(callback = null) {
    return request({
        url: '/group/options',
        method: 'post',
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


export function addGroup(data = {}, callback = null) {
    return request({
        url: '/group/add',
        method: 'post',
        data: data
    }, callback)
}

export function userGroupEdit(data = {}, callback = null) {
    return request({
        url: '/user/group',
        method: 'post',
        data: data
    }, callback)
}

