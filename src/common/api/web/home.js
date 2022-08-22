import request from '../../../utils/request.js'

export function home(params){
	return request({url: '/web/home', method: 'post', data: params})
}