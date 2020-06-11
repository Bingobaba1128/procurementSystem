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
    baseURL: 'http://192.168.10.222:8088/addPlanBuChong',
    method: 'post',
    data
  })
}

