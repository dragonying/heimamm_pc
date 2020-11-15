//数据概览

import request from '@/utils/request.js';


//面板数据
export function getTitleData(callback = null) {
    return request({
        url: '/data/title',
        method: 'post',
    }, callback)
}

//企业题目数据统计
export function getQuestionStatistics(callback = null) {
    return request({
        url: '/data/statistics',
        method: 'post',
    }, callback)
}