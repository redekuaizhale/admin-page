import request from '../libs/request'

export const menusReq = (data) => {
  return request({
    url: '/menu/query.do',
    method: 'post',
    data
  })
}

