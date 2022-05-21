//验证电话号码
export const PHONE_VALIDATE = { pattern: /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/, message: '电话号码格式错误'}
//验证手机号
export const MOBILE_VALIDATE = { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误', trigger: 'blur'}

//同时验证手机号或电话号
export const CONTACT_VALIDATE = { pattern: /^1[3456789]\d{9}$|^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/, message: '手机号或电话号码格式错误', trigger: 'blur'}
//验证身份证
export const IDCARD_VALIDATE = { pattern:/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/, message: '身份证号码格式错误',trigger: 'blur' }