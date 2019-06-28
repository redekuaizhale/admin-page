
import request from '../plugin/axios/index'

export function AccountLogin (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export const getUserMenuReq = (data) => {
  return request({
    url: '/user/menus.do',
    method: 'get',
    params: data
  })
}
