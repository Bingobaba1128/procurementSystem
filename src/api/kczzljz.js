import request from '@/utils/request'
import { baseUrl } from '@/api/apiUrl'

export function loadData(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}

export function editSelectedSetting(data) {
  return request({
    baseURL: baseUrl,
    url: 'addZhouZhuanL',
    data: data,
    method: 'post'
  })
}

export function deleteOData(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'post'
  })
}
