import request from '../libs/request'

export const menusReq = (data) => {
  return request({
    url: '/menu/query.do',
    method: 'post',
    data
  })
}

export const menuAddReq = (data) => {
  return request({
    url: '/menu/add.do',
    method: 'post',
    data
  })
}

export const menuEditReq = (data) => {
  return request({
    url: '/menu/edit.do',
    method: 'post',
    data
  })
}

