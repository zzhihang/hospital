import request from '../utils/request'

export function adminList (parameter) {
  return request({
    url: '/sysuser/list',
    method: 'post',
    data: parameter
  })
}

export function adminSave (parameter) {
  return request({
    url: 'sysuser/save',
    method: 'post',
    data: parameter
  })
}

export function adminResetPass (id) {
  return request({
    url: '/sysuser/resetpass',
    method: 'post',
    data: {id}
  })
}

export function adminEnable (id) {
  return request({
    url: '/sysuser/enable',
    method: 'post',
    data: {id}
  })
}

export function adminDisable (id) {
  return request({
    url: '/sysuser/disable',
    method: 'post',
    data: {id}
  })
}

export function adminInfo (id) {
  return request({
    url: '/sysuser/info',
    method: 'post',
    data: {id}
  })
}

export function adminDelete (ids) {
  return request({
    url: '/sysuser/delete',
    method: 'post',
    data: {
      ids
    }
  })
}

export function adminChangePassword (data) {
  return request({
    url: '/sysuser/changePass',
    method: 'post',
    data: data
  })
}
