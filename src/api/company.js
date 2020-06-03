import request from '../libs/request'

export const companysReq = (data) => {
  return request({
    url: '/company/query.do',
    method: 'post',
    data
  })
}

export const companyAddReq = (data) => {
  return request({
    url: '/company/add.do',
    method: 'post',
    data
  })
}

export const companyEditReq = (data) => {
  return request({
    url: '/company/edit.do',
    method: 'post',
    data
  })
}

export const companyDeleteReq = (data) => {
  return request({
    url: '/company/delete.do',
    method: 'post',
    data
  })
}

export const companyTreeReq = (data) => {
  return request({
    url: '/company/findCompanyTree.do',
    method: 'post',
    data
  })
}

export const loginUsercompanyTreeReq = (data) => {
  return request({
    url: '/company/findLoginUserCompanyTree.do',
    method: 'post',
    data
  })
}
