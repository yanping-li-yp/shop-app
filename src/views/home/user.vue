<template>
	<div style="background-color: #fafafa; margin-bottom: 50px;">
		<!-- 头部个人信息 -->
		<van-row class="top_header">
			<!-- 图片						 -->
			<van-image round width="80px" height="80px" :src="user.photo" />
			<div class="user_name">{{user.name}}</div>
			<div class="user_type">{{user.type}}</div>
		</van-row>
		<!-- 我的订单 -->
		<van-cell title="我的订单" is-link border to="/orderlist">
			<template #icon>
				<van-icon name="todo-list-o" class="icon"></van-icon>
			</template>
		</van-cell>
		<van-grid :column-num="5" :border="false" style="padding-bottom: 10px;">
			<van-grid-item v-for="(item, index) in orderList" :key="item.id" :icon="item.icon" :text="item.text"
				@click="navTo(item.toURL, item.id)" />
		</van-grid>

		<!-- 我的服务 -->
		<van-cell title="我的服务" border>
			<template #icon>
				<van-icon name="like-o" class="icon"></van-icon>
			</template>
		</van-cell>

		<van-grid :border="false" style="padding-bottom: 10px;">
			<van-grid-item v-for="(item, index) in myServiceList" :key="item.id" :icon="item.icon" :text="item.text"
				:to="item.toURL" />
		</van-grid>

		<!-- 其他 -->
		<van-cell title="其他" border>
			<template #icon>
				<van-icon name="home-o" class="icon"></van-icon>
			</template>
		</van-cell>

		<van-grid :column-num="4" :border="false" style="padding-bottom: 10px;">
			<van-grid-item v-for="(item, index) in otherList" :key="item.id" :icon="item.icon" :text="item.text"
				:to="item.toURL" />
		</van-grid>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					photo: 'https://img01.yzcdn.cn/vant/cat.jpeg',
					name: '123123123',
					type: '普通会员',
					toURL: ''
				},
				// 我的订单
				orderList: [{
					id: 1,
					icon: 'paid',
					text: '待付款',
					toURL: 'orderlist'
				}, {
					id: 2,
					icon: 'exchange',
					text: '待发货',
					toURL: 'orderlist'
				}, {
					id: 3,
					icon: 'logistics',
					text: '待收货',
					toURL: 'orderlist'
				}, {
					id: 4,
					icon: 'records',
					text: '待评价',
					toURL: 'orderlist'
				}, {
					id: 5,
					icon: 'replay',
					text: '退换货',
					toURL: ''
				}],
				myServiceList: [{
					id: 1,
					icon: 'cluster-o',
					text: '升级会员',
					toURL: ''
				}, {
					id: 2,
					icon: 'coupon-o',
					text: '我的优惠券',
					toURL: 'coupon'
				}, {
					id: 3,
					icon: 'after-sale',
					text: '我的余额',
					toURL: 'balance'
				}, {
					id: 4,
					icon: 'bill-o',
					text: '我的发票',
					toURL: ''
				}, {
					id: 5,
					icon: 'points',
					text: '我的积分',
					toURL: ''
				}, {
					id: 6,
					icon: 'location-o',
					text: '地址管理',
					toURL: 'address_list'
				}, {
					id: 7,
					icon: 'star-o',
					text: '我的收藏',
					toURL: 'collection'
				}, {
					id: 8,
					icon: 'flower-o',
					text: '我的足迹',
					toURL: 'history'
				}],
				otherList: [{
						id: 1,
						icon: 'friends-o',
						text: '邀请好友',
						toURL: ''
					},
					{
						id: 2,
						icon: 'setting-o',
						text: '系统设置',
						toURL: 'setting'
					}, {
						id: 3,
						icon: 'phone-circle-o',
						text: '联系客服',
						toURL: ''
					}, {}

				]
			};
		},
		methods: {
			navTo(name, id) {
				// console.log(name,id)
				this.$router.push({
					name: name,
					params: {
						id: id
					}
				})
			}
		}
	}
</script>

<style>
	.top_header {
		width: 100%;
		height: 146px;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 26px;
		/* justify-content: center; */
		background-image: url('http://zhongjun.ueoa.net/wap/static/image/member-bg.png');
		background-position: center;
		background-size: 100%;
		color: white;
	}

	.user_name {
		font-size: 0.9375rem;
		line-height: 26px;
	}

	.user_type {
		font-size: 0.75rem;
	}

	.icon {
		color: orangered;
		height: 22px;
		font-size: 24px;
		margin-right: 6px;
	}

	.van-grid-item__content {
		padding: 16px 8px;
		color: #797979;
	}
</style>
