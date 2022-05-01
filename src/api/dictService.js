import request from '@/utils/request'

export function dictDepartment () {
  return request({
    url: '/sysdept/query',
    method: 'post',
  })
}

export function dictDisease () {
  return request({
    url: '/sysdisease/query',
    method: 'post',
  })
}

export function dictHospital () {
  return request({
    url: '/syshospital/query',
    method: 'post',
  })
}

export function dicDoctor (params={}) {
  return request({
    url: '/doctor/query',
    method: 'post',
    data: params
  })
}

export function dictAllList () {
  return request({
    url: '/admin/sysdict/all',
    method: 'post',
  })
}

export function dictSave (params) {
  return request({
    url: '/admin/sysdict/save',
    method: 'post',
    data: params
  })
}