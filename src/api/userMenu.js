import request from '../libs/request'

export const userHasMenusReq = (data) => {
  return request({
    url: '/userMenu/userHasMenus.do',
    method: 'post',
    data
  })
}
