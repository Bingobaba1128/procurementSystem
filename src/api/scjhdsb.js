import request from '@/utils/request'
import { baseUrl } from '@/api/apiUrl'

export function loadSJDSBData(data) {
  return request({
    baseURL: '',
    url: data,
    method: 'get'
  })
}

export function updatePlanData(data) {
  return request({
    baseURL: baseUrl,
    url: '/addPlanBuChong',
    method: 'post',
    data
  })
}

export function searchTotalAmount() {
  return request({
    baseURL: baseUrl,
    url: '/searchTotal',
    method: 'get'
  })
}
