import request from '@/utils/request'

export function loadSJDSBData(data) {
  return request({
    baseURL: '',
    url: data,
    method: 'get'
  })
}

export function updatePlanData(data) {
  return request({
    baseURL: 'http://120.78.186.60:8097/addPlanBuChong',
    method: 'post',
    data
  })
}

export function searchTotalAmount() {
  return request({
    baseURL: 'http://120.78.186.60:8097',
    url: '/searchTotal',
    method: 'get'
  })
}
