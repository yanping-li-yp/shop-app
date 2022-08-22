<template>
	<div class="gray-bg">
		<div class="fixed-top-item">
			<!-- 顶部 -->
			<van-nav-bar title="订单列表" left-arrow @click-left="$back()" class="nav" />
			<!-- Tag标签 -->
			<van-tabs v-model="active" style="margin-top: -1px;" @click="tabSelect">
				<van-tab title="全部" />
				<van-tab title="待付款" />
				<van-tab title="待发货" />
				<van-tab title="已发货" />
				<van-tab title="待评价" />
			</van-tabs>
		</div>
		<!-- 如果order_list为空 -->
		<van-empty v-if="order_list.length == 0" image="error" description="描述文字"  style="margin-top: 90px;"/>
		
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功" v-else>
			
			<van-list v-model="loading" :offset="10" :immediate-check="isimmediate" :finished="finished" finished-text="没有更多了" @load="onLoad">
			
			<div style="margin-top: 90px;">
				<van-cell-group style="margin-bottom: 10px;" v-for="(item, index) in order_list" :key="index">
					<van-cell title="" :border="false">
						<template #label>
							<span>订单编号：{{item.order_no}}</span>
						</template>
						<template>
							<span>{{item.status_text}}</span>
						</template>
					</van-cell>
					<van-card v-for="(it, i) in item.goods" :key="i" num="2" :thumb="it.img" class="detail_card">
						<template #title>
							<div class="card_title">
								<span style="margin-right: 10px;">{{it.name}}</span>
								<span>￥{{it.sell_price}}</span>
							</div>
						</template>
					</van-card>
					<van-cell title="">
						<template #label>
							<span>合计 </span>
							<span style="color: red;">￥<b>{{item.real_amount}}</b> </span>
							<span>共<b> 2 </b>件</span>
						</template>
					</van-cell>
					<van-cell>
						<!-- <template> -->
						<van-button class="pay_now" @click="$navto('order_info?id='+item.order_no+'&type=1')">立即支付</van-button>
						<van-button class="check_details" @click="$navto('order_info?id='+item.order_no+'&type=1')">查看详情</van-button>
						<!-- </template> -->
					</van-cell>
				</van-cell-group>
			</div>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script>
	import {orderList} from '../../../common/api/web/order.js'
	export default {
		data() {
			return {
				active: 0,
				count:0,
				loading: false,
				isLoading: false,
				isimmediate: false,
				finished: false,
				order_list: [],
				page: 0,
				pagesize: 10,
			}
		}, //data
		mounted(){
			if(this.$route.params.id != undefined){
				this.active = this.$route.params.id
			}
			console.log(this.active)
			this.initData();
		},//mounted
		methods: {
			async initData(){
				var params = {
					page: this.page,
					pagesize: 5,
					status: this.active
				};
				let res = await orderList(params)
				this.page += 1;
				if (this.page > res.data.totalPage){
					this.finished = true; //结束下拉
				}
				if(res.code == 200){
					this.order_list.push(...res.data.data); //两个数组合并
				}else {
					this.$toast(res.msg);
				}
				this.loading = false;
				this.isLoading = false;
			},
			onLoad(){
				this.initData();
			},
			onRefresh() {
				setTimeout(() => {
					this.isLoading = false;
					this.count++;
				}, 1000);
			},
			tabSelect(){
				this.page = 1;
				this.order_list = [],
				this.initData();
			},
			navTo(name, id){
				this.$router.push({name: name, params: {id:id, url:'order'}})
			},
		}, //methods

	}
</script>

<style>
	.detail_card {
		background-color: white;
	}

	.card_title {
		font-size: 14px;
		margin-top: 2px;
		display: flex;
		justify-content: space-between;
	}

	.check_details,
	.pay_now {
		float: right;
		line-height: 24px;
		height: 24px;
		padding: 0px 10px;
		font-size: 12px;
	}

	.check_details {
		border-color: #9a9a9a;
		color: #9a9a9a;
		margin-right: 10px;
	}

	.pay_now {
		border-color: #333;
		color: #333;
	}
</style>
