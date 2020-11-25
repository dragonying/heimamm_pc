//学科列表

import request from '@/utils/request.js'

//列表数据
export function getRoleList (data = {}, callback = null) {
  return request(
    {
      url: '/role/list',
      method: 'get',
      params: data
    },
    callback
  )
}

//删除
export function delRole (data = {}, callback = null) {
  return request(
    {
      url: '/role/remove',
      method: 'post',
      data: data
    },
    callback
  )
}
//新增
export function addRole (data = {}, callback = null) {
  return request(
    {
      url: '/role/add',
      method: 'post',
      data: data
    },
    callback
  )
}
//编辑
export function editorRole (data = {}, callback = null) {
  return request(
    {
      url: '/role/edit',
      method: 'post',
      data: data
    },
    callback
  )
}

//用户权限
export function getRolePower (data = {}, callback = null) {
  return request(
    {
      url: '/role/getRolePower',
      method: 'get',
      params: data
    },
    callback
  )
}

// 权限详情
export function getRoleInfo (data = {}, callback = null) {
  return request(
    {
      url: '/role/roleInfo',
      method: 'get',
      params: data
    },
    callback
  )
}
/*所有模块 */
export function allmodule (callback = null) {
  return request(
    {
      url: '/role/allmodule',
      method: 'get'
    },
    callback
  )
}
