//学科列表

import request from '@/utils/request.js';


//列表数据
export function getSubjectList(data={},callback = null) {
    return request({
        url: '/subject/list',
        method: 'get',
        params:data
    }, callback)
}

//更改状态
export function setStatus(data={},callback = null) {
    return request({
        url: '/subject/status',
        method: 'post',
        data:data
    }, callback)
}

//删除
export function delSubject(data={},callback = null) {
    return request({
        url: '/subject/remove',
        method: 'post',
        data:data
    }, callback)
}
//新增
export function addSubject(data={},callback = null) {
    return request({
        url: '/subject/add',
        method: 'post',
        data:data
    }, callback)
}
//编辑
export function editorSubject(data={},callback = null) {
    return request({
        url: '/subject/edit',
        method: 'post',
        data:data
    }, callback)
}

//详情
export function getInfo(data={},callback = null) {
    return request({
        url: '/subject/info',
        method: 'get',
        params:data
    }, callback)
}