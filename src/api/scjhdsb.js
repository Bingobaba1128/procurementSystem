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
    baseURL: 'http://192.168.5.103:8088/addPlanBuChong',
    method: 'post',
    data
  })
}

export function searchTotalAmount() {
  return request({
    baseURL: 'http://192.168.5.103:8088',
    url: '/searchTotal',
    method: 'get'
  })
}
