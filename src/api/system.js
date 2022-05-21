import request from '../utils/request'

export function sysMenus () {
  return request({
    url: '/sysmenu/all',
    method: 'post',
  })
}

export function sysSaveLogo (logo) {
  return request({
    url: '/syssetting/saveLogo',
    method: 'post',
    data: {logo}
  })
}

export function saveCustomerTel (customerTel) {
  return request({
    url: '/syssetting/saveCustomerTel',
    method: 'post',
    data: {customerTel}
  })
}

export function saveCustomerImg (customerImg) {
  return request({
    url: '/syssetting/saveCustomerImg',
    method: 'post',
    data: {customerImg}
  })
}

export function sysSettingGet (params) {
  return request({
    url: '/syssetting/get',
    method: 'post',
    data: params
  })
}
