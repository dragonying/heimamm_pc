//学科列表

import request from '@/utils/request.js';


//列表数据
export function getAwemetList(data={},callback = null) {
    return request({
        url: '/aweme/list',
        method: 'post',
        data:data
    }, callback)
}

//评论列表
export function getCommentList(data={},callback = null) {
    return request({
        url: '/comment/list',
        method: 'post',
        data:data
    }, callback)
}

//删除
export function delAweme(data={},callback = null) {
    return request({
        url: '/aweme/del',
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