import request from '@/utils/request'
import { baseUrl } from '@/api/apiUrl'

export function loadData() {
  return request({
    baseURL: baseUrl,
    url: '/api/supplier/getTotalSupplier?supplierType=1',
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
