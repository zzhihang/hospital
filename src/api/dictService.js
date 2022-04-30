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