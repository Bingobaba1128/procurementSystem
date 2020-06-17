import request from '@/utils/request'
import baseUrl from '@/api/apiUrl'

export function loadSYuCeData(data) {
  return request({
    baseURL: '',
    url: data,
    method: 'get'
  })
}

export function uploadData(data) {
  return request({
    baseURL: 'http://192.168.5.103:8088/addCeYuDingDanPlan',
    method: 'post',
    data
  })
}

export function searchData(data) {
  return request({
    baseURL: '',
    url: data,
    method: 'get'
  })
}
