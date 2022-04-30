import request from '../utils/request'

export function adminList (parameter) {
  return request({
    url: '/sysuser/list',
    method: 'post',
    data: parameter
  })
}
