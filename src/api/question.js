//学科列表

import request from '@/utils/request.js';


//列表数据
export function getQuestionList(data = {}, callback = null) {
    return request({
        url: '/question/list',
        method: 'get',
        params: data
    }, callback)
}

//选项
export function getSelectOption(callback = null) {
    return request({
        url: '/question/getSelectOption',
        method: 'get',
    }, callback)
}

//更改状态
export function setStatus(data = {}, callback = null) {
    return request({
        url: '/question/status',
        method: 'post',
        data: data
    }, callback)
}

//删除
export function del(data = {}, callback = null) {
    return request({
        url: '/question/remove',
        method: 'post',
        data: data
    }, callback)
}
//新增
export function add(data = {}, callback = null) {
    return request({
        url: '/question/add',
        method: 'post',
        data: data
    }, callback)
}
//编辑
export function edit(data = {}, callback = null) {
    return request({
        url: '/question/edit',
        method: 'post',
        data: data
    }, callback)
}

//详情
export function getInfo(data = {}, callback = null) {
    return request({
        url: '/info',
        method: 'get',
        params: data
    }, callback)
}



