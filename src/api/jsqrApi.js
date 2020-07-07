import request from '@/utils/request'

export function loadJSData(data) {
  return request({
    baseURL: '',
    url: data,
    method: 'get'
  })
}

export function searchJSData(data) {
  return request({
    baseURL: '',
    url: data,
    method: 'get'
  })
}

export function insteadOfJing(data) {
  return request({
    baseURL: '',
    url: data,
    method: 'get'
  })
}

export function updateJSData(data) {
  return request({
    baseURL: 'http://120.78.186.60:8097/addJingWei',
    method: 'post',
    data
  })
}

export function searchPdf(data) {
  return request({
    baseURL: '',
    url: data,
    method: 'get'
  })
}
