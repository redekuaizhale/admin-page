import request from '../libs/request'

export const userRolesReq = (data) => {
  return request({
    url: '/userRole/query.do',
    method: 'post',
    data
  })
}

