import request from '@/utils/request'
import { baseUrl } from '@/api/apiUrl'

export function getAllYarnChanDi(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}

export function getOneYarnChanDi(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}

export function deleteChanDi(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'delete'
  })
}

export function addNewChanDi(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/addYarnChanDi',
    data: data,
    method: 'post'
  })
}

export function saveEditChanDi(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/addYarnChanDi',
    data: data,
    method: 'post'
  })
}
// export function addNewYuanSha(data) {
//   return request({
//     baseURL: '',
//     url: data,
//     method: 'get'
//   })
// }
