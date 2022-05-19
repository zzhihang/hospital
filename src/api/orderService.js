import request from '@/utils/request'

export function orderList (parameter) {
  return request({
    url: '/admin/order/list',
    method: 'post',
    data: parameter
  })
}

/**
* @Description: 平台每日收益
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/5/19 11:00
*/
export function orderPlatformDays (parameter) {
  return request({
    url: '/admin/order/transaction/days',
    method: 'post',
    data: parameter
  })
}


/**
* @Description: 医生累计收益统计
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/5/19 11:00
*/
export function orderDoctorRank (parameter) {
  return request({
    url: '/admin/order/transaction/doctorRank',
    method: 'post',
    data: parameter
  })
}

export function orderInfo (id) {
  return request({
    url: '/admin/order/info',
    method: 'post',
    data: {id}
  })
}

export function orderRefund (id) {
  return request({
    url: '/admin/order/refund',
    method: 'post',
    data: {id}
  })
}


