<template>
	<div>
	<!-- 	页面跳转
		1、template 组件方法
		2、更改路由，把页面设置为子路由实现点击跳转 -->
		
		<!-- 组件方法 -->
<!-- 		<template v-if="active == 'home'">
			<Index></Index>
		</template>
		<template v-if="active == 'type'">
			<Type></Type>
		</template>
		<template v-if="active == 'cart'">
			<Cart></Cart>
		</template>
		<template v-if="active == 'user'">
			<User></User>
		</template>
		 -->
		 
		 
		 <!-- 路由方法 -->
		 <!-- 1、子组件  2、路由引入  3、change事件push路由-->
		 <router-view />
		
		<van-tabbar v-model="active" @change="activeIndex" active-color="#ee0a24" inactive-color="#000">
		  <van-tabbar-item name="index" icon="wap-home">首页</van-tabbar-item>
		  <van-tabbar-item name="type" icon="bag">分类</van-tabbar-item>
		  <van-tabbar-item name="cart" icon="shopping-cart" :badge="cartLength">购物车</van-tabbar-item>
		  <van-tabbar-item name="user" icon="friends">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	import Index from '@/views/home/index.vue'
	import Cart from '@/views/home/cart.vue'
	import Type from '@/views/home/type.vue'
	import User from '@/views/home/user.vue'
	export default {
	  data() {
	    return {
	      active: 'index',
		  cartLength: ''
	    };
	  }, //data
	  components:{
		  Index,
		  Cart,
		  Type,
		  User
	  }, //conponents
	  methods:{
		  activeIndex(){
			  // console.log(this.active)
			  
			  this.$router.push('/' + this.active)
		  },
		  //子组件cart调用更新购物车长度
		  getCartlength(){
			  this.cartLength = this.$get_cart_length()
		  },
	  }, //methods
	  mounted() {
		  this.active = this.$route.name
		//计算购物车长度
		this.cartLength = this.$get_cart_length()
	  },//mounted
	};
</script>

<style>
</style>
