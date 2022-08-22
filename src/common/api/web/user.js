import request from '../../../utils/request.js'  //封装的请求库
// 登录接口
export function login(params){
	return request({url: '/web/login', method: 'post', data:params})
}
// 注册接口
export function register(params) {
	return request({ url: '/web/register', method: 'post', data: params})
}
// 找回密码接口
export function forget(params) {
	return request({ url: '/web/forget', method: 'post', data: params})
}


// 获取个人信息借口
export function userInfo(params) {
	return request({ url: '/web/userInfo', method: 'post', data: params})
}
// 获取个人地址列表信息
export function addressList(params) {
	return request({ url: '/web/addressList', method: 'post', data: params})
}
// 保存个人地址列表信息，传递ID代表编辑，无ID代表添加
export function addressSave(params) {
	return request({ url: '/web/addressSave', method: 'post', data: params})
}
//保存个人地址列表信息 //传递ID代表是编辑 无ID代表添加
export function addressInfo(params={}){
  return request({ url: '/web/addressInfo',method: 'post',data: params})
}

//删除地址信息
export function addressDel(params={}){
  return request({ url: '/web/addressDel',method: 'post',data: params})
}

//下单优惠劵
export function voucherList(params={}){
  return request({ url: '/web/voucherList',method: 'post',data: params})
}

//下单优惠劵
export function voucherChange(params={}){
  return request({ url: '/web/voucherChange',method: 'post',data: params})
}

// 优惠券列表
export function couponList(params={}){
	return request({url: '/web/couponList', method: 'post', data: params})
}