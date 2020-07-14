import request from '@/utils/request'
import { baseUrl } from '@/api/apiUrl'

export function getAllData(url) {
  return request({
    baseURL: baseUrl,
    url: url,
    method: 'get'
  })
}

export function searchResult(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}

export function deleteData(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}

export function addRecord(data) {
  return request({
    baseURL: baseUrl,
    url: '/addYuanShaContractFP',
    data: data,
    method: 'post'
  })
}

// export function saveEditDiaoPai(data) {
//   return request({
//     baseURL: baseUrl,
//     url: '/api/addYarnDiaoPai',
//     data: data,
//     method: 'post'
//   })
// }
