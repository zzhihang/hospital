import request from '@/utils/request'

/**
* @Description: 用户信息
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/4/18 23:01
*/
export function queryUserInfo (params) {
  return request({
    url: '/sysuser/current',
    method: 'post',
    data: params
  })
}


/**
* @Description: 上传
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/4/20 22:19
*/

export function upload (params) {
  return request({
    url: '/api/admin/upload',
    method: 'post',
    data: params
  })
}