import request from '../../../utils/request.js'
// 商品详情接口
export function goodsView(params){
	return request({url: '/web/goodsView', method: 'post', data: params})
}

// 商品分类
export function goodsClass(params) {
	return request({url: '/web/goodsClass', method: 'post', data: params})
}


// 商品列表
export function goodsList(params) {
	return request({url: '/web/goodsList', method: 'post', data: params})
}

// 商品筛选属性
export function goodsSpec(params) {
	return request({url: '/web/goodsSpec', method: 'post', data: params})
}