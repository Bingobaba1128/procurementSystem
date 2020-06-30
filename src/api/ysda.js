import request from '@/utils/request'
import { baseUrl } from '@/api/apiUrl'

export function getAllYarnArchives() {
  return request({
    baseURL: baseUrl,
    url: '/api/getAllYarnArchives',
    method: 'get'
  })
}

export function getOneYarnChengFen(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}

export function deleteChengFen(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'delete'
  })
}

export function addNewChengFen(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/addYarnChengFen',
    data: data,
    method: 'post'
  })
}

export function saveEditChengFen(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/addYarnChengFen',
    data: data,
    method: 'post'
  })
}
