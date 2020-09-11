import request from '../libs/request'

export const parametersReq = (data) => {
  return request({
    url: '/parameter/query.do',
    method: 'post',
    data
  })
}

export const findParameterByKeyReq = (data) => {
  return request({
    url: '/parameter/findByKey.do',
    method: 'post',
    data
  })
}

export const parameterAddReq = (data) => {
  return request({
    url: '/parameter/add.do',
    method: 'post',
    data
  })
}

export const parameterEditReq = (data) => {
  return request({
    url: '/parameter/edit.do',
    method: 'post',
    data
  })
}

export const parameterDeleteReq = (data) => {
  return request({
    url: '/parameter/delete.do',
    method: 'post',
    data
  })
}

