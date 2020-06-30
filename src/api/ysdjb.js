import request from '@/utils/request'
import { baseUrl } from '@/api/apiUrl'

export function getInitData(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}

export function getHistoryData(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}

// export function deleteChengFen(data) {
//   return request({
//     baseURL: baseUrl,
//     url: data,
//     method: 'delete'
//   })
// }

export function editSelectedSetting(data) {
  return request({
    baseURL: baseUrl,
    url: 'updateUnitPrice',
    data: data,
    method: 'post'
  })
}

// export function saveEditChengFen(data) {
//   return request({
//     baseURL: baseUrl,
//     url: '/api/addYarnChengFen',
//     data: data,
//     method: 'post'
//   })
// }
