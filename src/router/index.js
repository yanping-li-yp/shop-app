import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 点击时路由会重新添加，此方法为屏蔽该错误（此处系统帮我们自动屏蔽，所以可加可不加？）
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err=>err)
}


const routes = [
{
      path: '/',
      name: 'tabbar',
      component: () => import('@/views/home/tabbar'),
	  redirect: 'index',
	  children: [
		  {
			  path: '/index',
			  name: 'index',
			  component: () => import('@/views/home/index')
		  },{
			  path: '/type',
			  name: 'type',
			  component: () => import('@/views/home/type')
		  },{
			  path: '/cart',
			  name: 'cart',
			  component: () => import('@/views/home/cart')
		  },{
			  path: '/user',
			  name: 'user',
			  component: () => import('@/views/home/user')
		  }
	  ]
    },{
		path: '/login',
		name: 'login',
		component: ()=> import('@/views/login/login')
	},{
		path: '/reg',
		name: 'reg',
		component: ()=> import('@/views/login/reg')
	},{
		path: '/forget',
		name: 'forget',
		component: ()=> import('@/views/login/forget')
	},{
		path: '/goods/:id',
		name: 'goods',
		component: ()=> import('@/views/goods/goods'),
		// props: route => ({query: route.query.q})
	},{
		path: '/setting',
		name: 'setting',
		component: ()=> import('@/views/user/setting')
	},{
		path: '/member/info',
		name: 'info',
		component: ()=> import('@/views/user/member/info')
	},{
		path: '/member/uppass',
		name: 'uppass',
		component: ()=> import('@/views/user/member/uppass')
	},{
		path: '/orderlist',
		name: 'orderlist',
		component: ()=> import('@/views/user/order/orderlist')
	},{
		path: '/addorder',
		name: 'addorder',
		component: ()=> import('@/views/user/order/addorder')
	},{
		path: '/address_list',
		name: 'address_list',
		component: ()=> import('@/views/user/address/address_list')
	},{
		path: '/address_edit/:id',
		name: 'address_edit',
		component: ()=> import('@/views/user/address/address_edit')
	},{
		path: '/payment',
		name: 'payment',
		component: ()=> import('@/views/user/payment')
	},{
		path: '/result',
		name: 'result',
		component: ()=> import('@/views/user/result'),
		props: route => ({
		      query: route.query.q
		    })
	},{
		path: '/order_info',
		name: 'order_info',
		component: ()=> import('@/views/user/order/order_info')
	},{
		path: '/balance',
		name: 'balance',
		component: ()=> import('@/views/user/member/balance/index')
	},{
		path: '/withdraw_cash',
		name: 'withdraw_cash',
		component: ()=> import('@/views/user/member/balance/withdraw_cash')
	},{
		path: '/detail',
		name: 'detail',
		component: ()=> import('@/views/user/member/balance/detail')
	},{
		path: '/recharge',
		name: 'recharge',
		component: ()=> import('@/views/user/member/balance/recharge')
	},{
		path: '/bankcard',
		name: 'bankcard',
		component: ()=> import('@/views/user/member/balance/bankcard')
	},{
		path: '/bankcard_edit',
		name: 'bankcard_edit',
		component: ()=> import('@/views/user/member/balance/bankcard_edit')
	},{
		path: '/collection',
		name: 'collection',
		component: ()=> import('@/views/user/member/balance/collection')
	},{
		path: '/history',
		name: 'history',
		component: ()=> import('@/views/user/member/balance/history')
	},{
		path: '/coupon',
		name: 'coupon',
		component: ()=> import('@/views/user/member/balance/coupon')
	},{
		path: '/classify/:id',
		name: 'classify',
		component: ()=> import('@/views/goods/classify')
	}
  ]

const router = new Router({ routes })

let noLogin = ['/login','/reg', '/logout', '/forget'];
router.beforeEach((to, from, next) => {
	let token = localStorage.getItem('token');
	if (token != '' || noLogin.indexOf(to.path) > -1){
		next()
	}else{
		next('/login')
	}
})
export default router


