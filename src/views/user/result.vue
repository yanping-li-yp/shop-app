<template>
	<div>
		<!-- 顶部 -->
		<van-nav-bar title="支付结果" left-arrow @click-left="$back('-3')" />
		<van-row class="icon_out">
			<van-icon name="success" class="icon_success" />
		</van-row>
		<van-row class="pay_success">{{result_txt}}</van-row>
		<van-row class="price">{{order_amount}}</van-row>
		<van-row class="pay_result" @click="checkDetails">查看详情</van-row>

	</div>
</template>

<script>
	import {
		orderView
	} from '../../common/api/web/order.js'
	export default {
		data() {
			return {
				status: 0,
				result_txt: '正在加载',
				order_no:'',
				order_amount: 0
			}
		}, //data
		mounted() {
			// console.log(this.$route.query)
			this.order_no = this.$route.query.id;
			this.initData();
		},
		methods: {
			async initData() {
				let res = await orderView({order_no: this.order_no});
				// console.log(res)
				if (res.code == 200) {
					this.status = res.data.pay_status;
					if(this.status == 1) {
						this.result_txt = '支付成功'
					}else {
						this.result_txt = '支付失败';
					}
					this.order_amount = res.data.order_amount;
				}
			},
			checkDetails(){
				this.$navto('/order_info?id=' + this.order_no);
			}
		}, //methods
	}
</script>

<style>
	.icon_out {
		width: 70px;
		height: 70px;
		border-radius: 50%;
		background-color: rgb(46, 198, 117);
		margin: 150px auto 15px;
	}

	.icon_success {
		color: white;
		font-size: 50px;
		line-height: 70px;
		display: flex;
		justify-content: center;
	}

	.pay_success, .price, .pay_result {
		margin: 10px auto 0;
		display: flex;
		justify-content: center;
	}
	.price {
		color: red;
	}
	.pay_result{
		font-size: 14px;
		width: 100px;
		line-height: 32px;
		color: #9f9f9f;
		border: 1px solid #cecece;
		margin-top: 30px;
	}
</style>
