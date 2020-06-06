import request from '@/utils/request'

// const data = {
// 	"clothId":"123",
// 	"time":"1qa",
// 	"no":"sss"
// }

export function getTestResult() {
  return request({
    baseURL: '192.168.41.102:8088',
    url: '/addJingWei1',
    method: 'post'
  })
}
