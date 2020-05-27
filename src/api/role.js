import request from '../libs/request'

export const rolesReq = (data) => {
  return request({
    url: '/role/query.do',
    method: 'post',
    data
  })
}

export const roleAddReq = (data) => {
  return request({
    url: '/role/add.do',
    method: 'post',
    data
  })
}

export const roleEditReq = (data) => {
  return request({
    url: '/role/edit.do',
    method: 'post',
    data
  })
}

export const roleDeleteReq = (data) => {
  return request({
    url: '/role/delete.do',
    method: 'post',
    data
  })
}

