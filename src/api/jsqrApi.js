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
    baseURL: 'http://192.168.10.222:8088/addJingWei',
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
