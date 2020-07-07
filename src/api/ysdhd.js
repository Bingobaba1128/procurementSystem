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

export function addNewData(data) {
  return request({
    baseURL: '',
    url: 'http://120.78.186.60:8097/addPurchaseByNoPlan',
    method: 'post',
    data
  })
}

export function loadPinZhongByCloth(data) {
  return request({
    baseURL: '',
    url: data,
    method: 'get'
  })
}

export function deleteData(data) {
  return request({
    baseURL: '',
    url: data,
    method: 'post'
  })
}

export function searchData(data) {
  return request({
    baseURL: '',
    url: data,
    method: 'get'
  })
}

export function getFile(data) {
  return request({
    baseURL: '',
    url: data,
    method: 'get'
  })
}
