import request from '../libs/request'

export const userHasMenusReq = (data) => {
  return request({
    url: '/userMenu/userHasMenus.do',
    method: 'post',
    data
  })
}

export const editUserHasMenusReq = (data) => {
  return request({
    url: '/userMenu/editUserHasMenus.do',
    method: 'post',
    data
  })
}
