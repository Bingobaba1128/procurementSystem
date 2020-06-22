import request from '@/utils/request'
import baseUrl from '@/api/apiUrl'

export function loadYuanShaData(data) {
  return request({
    baseURL: '',
    url: data,
    method: 'get'
  })
}

export function addNewYuanSha(data) {
  return request({
    baseURL: '',
    url: data,
    method: 'get'
  })
}

export function loadContactPerson(data) {
  return request({
    baseURL: '',
    url: data,
    method: 'get'
  })
}

export function loadFeature(data) {
  return request({
    baseURL: '',
    url: data,
    method: 'get'
  })
}
// export function addNewYuanSha(data) {
//   return request({
//     baseURL: baseUrl,
//     url: '/api/supplier/getAllSupplier',
//     method: 'post',
//     data
//   })
// }

