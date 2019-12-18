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

