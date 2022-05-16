import request from '@/utils/request'

/**
* @Description: 首页报表
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/5/16 22:14
*/
export function reportOrder (params={}) {
  return request({
    url: '/admin/report/orderzl',
    method: 'post',
    data: params
  })
}

export function reportUser (params={}) {
  return request({
    url: '/admin/report/userzl',
    method: 'post',
    data: params
  })
}

export function reportDoctor (params={}) {
  return request({
    url: '/admin/report/yszl',
    method: 'post',
    data: params
  })
}

export function reportGain (params={}) {
  return request({
    url: '/admin/report/yszl',
    method: 'post',
    data: params
  })
}