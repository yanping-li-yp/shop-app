<template>
	<div style="position: absolute; width: 100%; height: 100%; background-color: rgb(248,248,248);">
		<!-- 顶部 -->
		<van-nav-bar title="订单详情" left-arrow @click-left="$back()" />
		<!-- 发货状态 -->
		<van-cell :title="orderlist.status_text" style="margin-top: 10px;">
			<template #label>
				<van-row>订单号：{{orderlist.order_no}}</van-row>
				<van-row>下单时间：{{orderlist.create_time}}</van-row>
			</template>
		</van-cell>
		<!-- 收件人信息 -->
		<van-cell :label="orderlist.mobile" style="margin-top: 10px;">
			<template #title>
				收件人：{{orderlist.accept_name}}
			</template>
		</van-cell>
		<!-- 商品卡片 -->
		<van-card v-for="(item,index) in orderlist.goods" :key="index" num="2" :thumb="item.img">
			<template #title>
				<div class="card_title">
					<span style="margin-right: 10px;">{{item.name}}</span>
					<span>￥{{item.sell_price}}</span>
				</div>
			</template>
		</van-card>
		
		<van-cell class="details">
			<template #title>
				<span> </span>
			</template>
			<template #label>
				<div class="more_details">
					<span>运费</span>
					<span>￥0.00</span>
				</div>
				<div class="more_details">
					<span>订单总价</span>
					<span class="total_price">￥3999.98</span>
				</div>
				<div class="more_details">
					<span>支付方式</span>
					<span>{{orderlist.payment_text}}</span>
				</div>
				<div class="more_details">
					<span>支付时间</span>
					<span>{{orderlist.pay_time}}</span>
				</div>
			</template>
		</van-cell>
		
		<van-submit-bar button-text="申请售后" @submit="onSubmit" />

	</div>
</template>

<script>
	import {orderView} from '../../../common/api/web/order.js'
	export default {
		data() {
			return {
				orderlist: {},
				order_no: '',
				topage: -4
			}
		}, //
		mounted() {
			// console.log(this.$route.query)
			this.order_no = this.$route.query.id;
			this.initData();
			
			if(this.$route.params.url != undefined){
				this.topage = -1
			}
		},
		methods: {
			async initData(){
				let res = await orderView({order_no: this.order_no})
				if(res.code == 200){
					this.orderlist = res.data
					console.log(this.orderlist)
				}else{
					this.$toast(res.msg)
				}
			},
			onSubmit(){
				this.$toast('申请售后')
			}
		}
	}
</script>

<style>
	.detail_card{
		background-color: white;
		position: relative;
		width: 100%;
	}
	.card_title{
		font-size: 14px;
		margin-top: 2px;
		display: flex;
		justify-content: space-between;
	}
	.details{
		margin-top: 10px;
	}
	.total_price{
		color: red;
	}
	.more_details{
		display: flex;
		justify-content: space-between;
		line-height: 20px;
		font-size: 13px;
	}
</style>
