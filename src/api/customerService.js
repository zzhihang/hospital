import request from '@/utils/request'

export function customerList (parameter) {
  return request({
    url: '/userinfo/list',
    method: 'post',
    data: parameter
  })
}

export function customerDisable (id) {
  return request({
    url: '/userinfo/disable',
    method: 'post',
    data: {id}
  })
}

export function customerEnable (id) {
  return request({
    url: '/userinfo/enable',
    method: 'post',
    data: {id}
  })
}

export function patientList (parameter) {
  return request({
    url: '/userpatient/list',
    method: 'post',
    data: parameter
  })
}

export function patientSave (parameter) {
  return request({
    url: '/userpatient/save',
    method: 'post',
    data: parameter
  })
}