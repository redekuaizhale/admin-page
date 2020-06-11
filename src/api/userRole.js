import request from '../libs/request'

export const userRolesReq = (data) => {
  return request({
    url: '/userRole/query.do',
    method: 'post',
    data
  })
}

export const addUserRoleReq = (data) => {
  return request({
    url: '/userRole/addUserRole.do',
    method: 'post',
    data
  })
}

export const findHasRoleIdsReq = (data) => {
  return request({
    url: '/userRole/findHasRoleIds.do',
    method: 'post',
    data
  })
}

