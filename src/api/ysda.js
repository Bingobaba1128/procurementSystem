import request from '@/utils/request'
import { baseUrl } from '@/api/apiUrl'

export function getAllYarnArchives() {
  return request({
    baseURL: baseUrl,
    url: '/api/getAllYarnArchives',
    method: 'get'
  })
}

export function getOneRecord(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}

export function deleteRecord(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'delete'
  })
}

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
//     url: '/api/addYarnChengFen',
//     data: data,
//     method: 'post'
//   })
// }

export function saveNewForm(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/addYarnArchives',
    data: data,
    method: 'post'
  })
}
