import request from '../utils/request'

export function sysMenus () {
  return request({
    url: '/sysmenu/all',
    method: 'post',
  })
}
