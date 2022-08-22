<template>
	<div style="background-color: #f8f8f8; width: 100%; height: 100%; position: absolute;">
		<!-- 顶部 -->
		<van-nav-bar title="支付" left-arrow @click-left="$back()" />


		<van-cell-group style="margin-top: 10px;">
			<van-cell title="订单类型" value="商品订单"></van-cell>
			<van-cell title="订单号" :value="order_id"></van-cell>
			<van-cell title="订单金额">
				<template>
					<span style="color: red;">￥{{money}}</span>
				</template>
			</van-cell>
		</van-cell-group>

		<van-cell-group style="margin-top: 10px;">
			<!-- 微信支付 -->
			<van-cell v-for="(item,index) in paylist" :key="index" :title="item.pay_name" :label="item.description" @click="pay(item.id)">
				<template>
					<van-icon name="arrow" class="pay_icon_right" />
				</template>
				<template #icon>
					<div class="pay_icon_outer">
						<van-image :src="item.img" class="pay_icon"/>
					</div>
				</template>
			</van-cell>
		</van-cell-group>


	</div>
</template>

<script>
	import {
		paymentList,
		paymentAct
	} from '../../common/api/web/order.js';
	export default {
		data() {
			return {
				order_id: '',
				money: 0,
				type: 0,
				paylist: []
			}
		}, //data
		mounted() {
			// console.log(this.$route.query)
			this.order_id = this.$route.query.id;
			this.type = this.$route.query.type;
			this.initData();
		},
		methods: {
			async initData() {
				// 支付方法接口
				let res = await paymentList({
					order_id: this.order_id
				});
				// console.log(res)
				if (res.code == 200) {
					this.paylist = res.data.data;
					this.money = res.data.money;
					// console.log(this.paylist)
				}
			},
			async pay(id) {
				let params = {
					pay_id: id,
					order_id: this.order_id
				}
				let that = this;
				//付款
				let res = await paymentAct(params);
				this.$toast(res.msg);
				if(res.code == 200){
					this.$router.push('result?id='+that.order_id)
				}


				// this.$toast.loading({
				// 	message: '加载中...',
				// 	forbidClick: true,
				// });
				// let that = this;
				// setTimeout(function(){
				// 	that.$router.push('/result')
				// },3000)
			}
		}
	}
</script>

<style>
	.pay_icon {
		position: absolute;
		/* margin-top: 6px; */
		width: 50px;
		height: 50px;
	}

	.pay_icon_outer {
		margin-right: 12px;
		padding-right: 12px;
		width: 50px;
		/* background-color: red; */
		border-right-style: solid;
		border-width: 1px;
		border-color: #f0f0f0;
	}

	.pay_icon_right {
		font-size: 16px;
		line-height: 47px;
	}
</style>
