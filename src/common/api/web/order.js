import request from '../../../utils/request.js'

// 提交订单接口
export function orderAct(params={}) {
	return request({url: '/web/orderAct', method: 'post', data:params})
}

//订单详情接口
export function orderView(params={}){
  return request({ url: '/web/orderView',method: 'post',data: params})
}


//订单列表详情接口
export function orderList(params={}){
  return request({ url: '/web/orderList',method: 'post',data: params})
}



//支付列表接口
export function paymentList(params={}){
  return request({ url: '/web/paymentList',method: 'post',data: params})
}



//支付接口
export function paymentAct(params={}){
  return request({ url: '/web/paymentAct',method: 'post',data: params})
}