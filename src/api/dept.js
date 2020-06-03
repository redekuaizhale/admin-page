import request from '../libs/request'

export const deptsReq = (data) => {
  return request({
    url: '/dept/query.do',
    method: 'post',
    data
  })
}

export const deptAddReq = (data) => {
  return request({
    url: '/dept/add.do',
    method: 'post',
    data
  })
}

export const deptEditReq = (data) => {
  return request({
    url: '/dept/edit.do',
    method: 'post',
    data
  })
}

export const deptDeleteReq = (data) => {
  return request({
    url: '/dept/delete.do',
    method: 'post',
    data
  })
}

export const findByCompanyIdReq = (data) => {
  return request({
    url: '/dept/findByCompanyId.do',
    method: 'post',
    data
  })
}

