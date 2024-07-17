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
export function auth(data={},callback = null) {
    return request({
        url: '/auth',
        method: 'post',
        data
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
export function groupUserList(data = {}, callback = null) {
    return request({
        url: '/groupUser/list',
        method: 'post',
        data: data
    }, callback)
}
export function groupUserDel(data = {}, callback = null) {
    return request({
        url: '/groupUser/del',
        method: 'post',
        data: data
    }, callback)
}
export function dataStatic(callback = null) {
    return request({
        url: '/dataStatic',
        method: 'post',
    }, callback)
}
export function addTask(data = {}, callback = null) {
    return request({
        url: '/addTask',
        method: 'post',
        data
    }, callback)
}
export function getTask(data = {}, callback = null) {
    return request({
        url: '/getTask',
        method: 'post',
        data
    }, callback)
}
export function followingList(data = {}, callback = null) {
    return request({
        url: '/followingList',
        method: 'post',
        data
    }, callback)
}
export function followerList(data = {}, callback = null) {
    return request({
        url: '/followerList',
        method: 'post',
        data
    }, callback)
}


