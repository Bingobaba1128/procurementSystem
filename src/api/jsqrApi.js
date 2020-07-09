import request from '@/utils/request'
import { baseUrl } from '@/api/apiUrl'

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
    baseURL: baseUrl,
    url: '/addJingWei',
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
