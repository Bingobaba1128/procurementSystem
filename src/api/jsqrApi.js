import request from '@/utils/request'
import axios from 'axios'

export function getTestResult() {
  return request({
    baseURL: 'http://192.168.10.222:8088',
    url: '/addJingWei1',
    method: 'post'
  })
}

// export function getTestResult() {
//   return axios({
//     baseURL: 'http://192.168.10.222:8088',
//     url: '/addJingWei1',
//     method: 'post'
//   })
// }

