import request from '@/utils/request'
import { baseUrl } from '@/api/apiUrl'

export function getAllData(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}

// export function getOneRecord(data) {
//   return request({
//     baseURL: baseUrl,
//     url: data,
//     method: 'get'
//   })
// }

// export function deleteRecord(data) {
//   return request({
//     baseURL: baseUrl,
//     url: data,
//     method: 'delete'
//   })
// }

export function getSettingList(set) {
  return request({
    baseURL: baseUrl,
    url: '/api/' + set,
    method: 'get'
  })
}
// export function addNewChengFen(data) {
//   return request({
//     baseURL: baseUrl,
//     url: '/addChengFen',
//     data: data,
//     method: 'post'
//   })
// }

export function saveNewForm(data) {
  return request({
    baseURL: baseUrl,
    url: '/updateZhongLiang',
    data: data,
    method: 'post'
  })
}

// export function searchBycCondition(data) {
//   return request({
//     baseURL: '',
//     url: data,
//     method: 'get'
//   })
// }

// export function getChengFen(data) {
//   return request({
//     baseURL: baseUrl,
//     url: '/selChengFen?id=' + data,
//     method: 'get'
//   })
// }
