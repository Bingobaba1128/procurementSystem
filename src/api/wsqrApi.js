import request from '@/utils/request'
import { baseUrl } from '@/api/apiUrl'

export function loadWSData(data) {
  return request({
    baseURL: '',
    url: data,
    method: 'get'
  })
}

export function updateWSData(data) {
  return request({
    baseURL: baseUrl,
    url: '/addWeiSha',
    method: 'post',
    data
  })
}
