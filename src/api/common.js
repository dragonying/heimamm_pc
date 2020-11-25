import request from '@/utils/request.js';

//选项
export function getSelectOption(callback = null) {
    return request({
        url: '/question/getSelectOption',
        method: 'get',
    }, callback)
}

//头像上传
export const uploadPicture = {
    baseUrl:process.env.VUE_APP_BASEURL,
    url: process.env.VUE_APP_BASEURL + '/uploads',//上传地址
    name: 'image', //上传文件字段名
    acceptType: ['jpg', 'jpeg', 'png', 'gif'],//允许的类型
    sizeLimit: 4 * 1024 * 1024,//上传大小限制 B
}

//视频上传
export const uploadVideo = {
    baseUrl:process.env.VUE_APP_BASEURL,
    url: process.env.VUE_APP_BASEURL + '/question/upload',//上传地址
    name: 'file', //上传文件字段名
    acceptType: ['mp4', 'avi'],//允许的类型
    sizeLimit: 100 * 1024 * 1024,//上传大小限制 B
}