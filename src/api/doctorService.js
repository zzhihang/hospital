import request from '../utils/request'

export function hospitalList (parameter) {
  return request({
    url: '/syshospital/list',
    method: 'post',
    data: parameter
  })
}

export function hospitalSave (parameter) {
  return request({
    url: '/syshospital/save',
    method: 'post',
    data: parameter
  })
}

export function hospitalDelete (id) {
  return request({
    url: '/syshospital/delete',
    method: 'post',
    data: {id}
  })
}

export function doctorList (parameter) {
  return request({
    url: '/doctor/list',
    method: 'post',
    data: parameter
  })
}

export function doctorSave (parameter) {
  return request({
    url: '/doctor/save',
    method: 'post',
    data: parameter
  })
}

export function doctorEnable (id) {
  return request({
    url: '/doctor/enable',
    method: 'post',
    data: {id}
  })
}

export function doctorDisable (id) {
  return request({
    url: '/doctor/disable',
    method: 'post',
    data: {id}
  })
}

export function doctorInfo (id) {
  return request({
    url: '/doctor/info',
    method: 'post',
    data: {id}
  })
}

export function serviceList (parameter) {
  return request({
    url: '/doctorgs/list',
    method: 'post',
    data: parameter
  })
}

/**
* @Description:
* @Param:   {
	"auditType": 0,
	"ids": []
}
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/4/30 19:18
*/
export function serviceAudit (parameter) {
  return request({
    url: '/doctorgs/audit',
    method: 'post',
    data: parameter
  })
}

export function serviceDisable(id) {
  return request({
    url: '/doctorgs/disable',
    method: 'post',
    data: {id}
  })
}

export function serviceEnable(id) {
  return request({
    url: '/doctorgs/enable',
    method: 'post',
    data: {id}
  })
}


export function departmentList (parameter) {
  return request({
    url: '/sysdept/list',
    method: 'post',
    data: parameter
  })
}

export function departmentSave (parameter) {
  return request({
    url: '/sysdept/save',
    method: 'post',
    data: parameter
  })
}

export function diaeaseList (parameter) {
  return request({
    url: '/sysdisease/list',
    method: 'post',
    data: parameter
  })
}

export function diseaseSave (parameter) {
  return request({
    url: '/sysdisease/save',
    method: 'post',
    data: parameter
  })
}

export function diseaseDelete (parameter) {
  return request({
    url: '/sysdisease/delete',
    method: 'post',
    data: parameter
  })
}


