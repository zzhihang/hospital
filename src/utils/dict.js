export const PAY_STATUS = [{ text: '支付成功', value: '1' }, { text: '支付失败', value: '-1' }]
export const PAY_TYPE = [{ text: '微信', value: 'wx' }, { text: '支付宝', value: 'ali' }]
export const BUSINESS_TYPE = [{ text: '月', value: 'month' }, { text: '季度', value: 'quarter' }, {
  text: '年',
  value: 'year'
}]
export const CONTENT_STATUS = [{ text: '待审核', value: '0' }, { text: '通过', value: '1' }, { text: '驳回', value: '2' }]
export const AUDIT_STATUS = [{ text: '待审核', value: '0' }, { text: '审核通过', value: '1' }, { text: '审核不通过', value: '2' }]
export const ENABLE_STATUS = [{ text: '启用', value: 1 }, { text: '禁用', value: 0 }]
export const SUBSCRIBE_STATUS = [{ text: '订阅中', value: '1' }, { text: '已过期', value: '0' }]
export const DYNAMIC_TYPE = [{ text: '文本', value: 'text' }, { text: '图片', value: 'pic' }, {
  text: '文档',
  value: 'doc'
}, { text: '语音', value: 'voice' }]
export const ORDER_TYPE = [{ text: '付费订阅', value: 'zhuanti' }]
export const ORDER_STATUS = [{ text: '进行中', value: 'JXZ' }, { text: '待支付', value: 'DZF' }, {
  text: '已完成',
  value: 'YWC'
}, { text: '已取消', value: 'YQX' }, { text: '已退款', value: 'YTK' }, { text: '待接收', value: 'DJS' }, {
  text: '被驳回',
  value: 'BBH'
}]
export const SEX_TYPE = [{ text: '男', value: '男' }, { text: '女', value: '女' }]


//手动导出供filter使用 一开始没使用 所以只能这里补救了
export default {
  PAY_STATUS,
  PAY_TYPE,
  BUSINESS_TYPE,
  CONTENT_STATUS,
  AUDIT_STATUS,
  ENABLE_STATUS,
  SUBSCRIBE_STATUS,
  DYNAMIC_TYPE,
  ORDER_TYPE,
  SEX_TYPE,
  ORDER_STATUS
}