import request from '@/utils/request'

export function loadWSData(data) {
  return request({
    baseURL: '',
    url: data,
    method: 'get'
  })
}

// export function searchWSData(data) {
//   return request({
//     baseURL: '',
//     url: data,
//     method: 'get'
//   })
// }

// export function insteadOfJing(data) {
//   return request({
//     baseURL: '',
//     url: data,
//     method: 'get'
//   })
// }

export function updateWSData(data) {
  return request({
    baseURL: 'http://192.168.5.103:8088/addWeiSha',
    method: 'post',
    data
  })
}

// export function searchPdf(data) {
//   return request({
//     baseURL: '',
//     url: data,
//     method: 'get'
//   })
// }

