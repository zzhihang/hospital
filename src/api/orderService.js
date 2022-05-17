import request from '@/utils/request'

export function orderList (parameter) {
  return request({
    url: '/admin/order/list',
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
