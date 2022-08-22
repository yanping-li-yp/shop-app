<template>
	<div class="gray-bg">
		<van-nav-bar title="我的优惠券" left-arrow @click-left="$back()" />

		<!-- Tag标签 -->
		<!-- 切换标签时不用切换页面，直接更改列表数据即可 -->
		<van-tabs v-model="active" @change="selectTab">
			<van-tab title="未使用" />
			<van-tab title="已使用" />
			<van-tab title="已失效" />
		</van-tabs>

		<!-- 下拉刷新 -->
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check="immediateCheck" offset="10" @load="onLoad">

				<van-cell-group>

					<van-cell v-for="(item,index) in dataList" :key="index" :title="item.name">
						<template #label>
							<van-row>购买所有商品 减{{item.value}}元</van-row>
							<van-row>有效期：{{item.start_time}} - {{item.end_time}}</van-row>
						</template>
						<template #icon>
							<div class="icon_coupon" :style="{'background-color':color}">coupon</div>
						</template>
					</van-cell>

				</van-cell-group>
			</van-list>
		</van-pull-refresh>


	</div>
</template>

<script>
	import {
		couponList
	} from '../../../../common/api/web/user.js'
	export default {
		data() {
			return {
				active: 0,
				color: '#c8c8c8',
				dataList: [],
				page: 0,
				pagesize: 2,
				isLoading: false,
				loading: false,
				finished: false,
				refreshing: false,
				immediateCheck: false,
			}
		}, //data
		methods: {
			async initData() {
				this.page = this.page+1;
				var params = {
					page: this.page,
					pagesize: this.pagesize,
					status: this.active
				};
				// console.log(params)
				let res = await couponList(params);
				this.isLoading = false;
				this.loading = false;
				if (res.code == 200) {
					this.dataList.push(...res.data.data)
					// console.log(this.dataList)
					if(res.data.data.length == 0){
						this.finished = true;
					}
				}
			},
			selectTab() {
				// console.log(this.active)
				this.couponColor()
				this.page = 0;
				this.dataList = [];
				this.initData()
			},
			couponColor() {
				if (this.active == 0) {
					this.color = '#ff7159'
				} else {
					this.color = '#c8c8c8'
				}
			},
			onRefresh() {
				this.initData()
			},
			onLoad(){
				this.initData();
			},
		}, //methods
		mounted() {
			this.couponColor()
			this.initData();
		}
	}
</script>

<style>
	.icon_coupon {
		writing-mode: vertical-rl;
		color: white;
		width: 30px;
		border-top-left-radius: 6px;
		border-bottom-left-radius: 6px;
		text-align: center;
		font-size: 16px;
		margin-right: 6px;
	}
</style>
