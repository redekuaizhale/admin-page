import request from '../libs/request'

export const loginReq = (data) => {
  return request({
    url: '/user/login.do',
    method: 'post',
    data
  })
}

export const userMenusReq = (data) => {
  return request({
    url: '/user/userMenus.do',
    method: 'post',
    data
  })
}

export const permissionsReq = (data) => {
  return request({
    url: '/user/userMenuPermission.do',
    method: 'get',
    params: data
  })
}

export const usersReq = (data) => {
  return request({
    url: '/user/query.do',
    method: 'post',
    data
  })
}

export const userAddReq = (data) => {
  return request({
    url: '/user/add.do',
    method: 'post',
    data
  })
}

export const userEditReq = (data) => {
  return request({
    url: '/user/edit.do',
    method: 'post',
    data
  })
}

export const userDeleteReq = (data) => {
  return request({
    url: '/user/delete.do',
    method: 'post',
    data
  })
}

