import request from '@/utils/request'
import { baseUrl } from '@/api/apiUrl'

export function getAllYarnDiaoPai(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/getAllYarnDiaoPai',
    method: 'get'
  })
}

export function getOneYarnDiaoPai(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}

export function deleteDiaoPai(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'delete'
  })
}

export function addNewDiaoPai(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/addYarnDiaoPai',
    data: data,
    method: 'post'
  })
}

export function saveEditDiaoPai(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/addYarnDiaoPai',
    data: data,
    method: 'post'
  })
}
