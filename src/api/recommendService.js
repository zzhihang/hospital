import request from '../utils/request'

export function recommendList (parameter) {
  return request({
    url: '/admin/doctorrecommend/all',
    method: 'post',
    data: parameter
  })
}
export function recommendSave (parameter) {
  return request({
    url: '/admin/doctorrecommend/save',
    method: 'post',
    data: parameter
  })
}
