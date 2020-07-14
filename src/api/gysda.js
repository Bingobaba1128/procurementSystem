import request from '@/utils/request'
import { baseUrl } from '@/api/apiUrl'

export function loadData(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}

export function saveNewForm(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/supplier/yuanSha',
    data: data,
    method: 'post'
  })
}

export function deleteRecord(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'delete'
  })
}
export function getOneRecord(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}

export function searchData(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}
