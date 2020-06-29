import request from '@/utils/request'
import { baseUrl } from '@/api/apiUrl'

export function getAllYarnYanSe(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/getAllYarnYanSe',
    method: 'get'
  })
}

export function getOneYarnYanSe(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}

export function deleteYanSe(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'delete'
  })
}

export function addNewYanSe(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/addYarnYanSe',
    data: data,
    method: 'post'
  })
}

export function saveEditYanSe(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/addYarnYanSe',
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
