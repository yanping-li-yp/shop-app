<template>
	<div class="gray-bg">

		<!-- 搜索框 -->
		<van-search v-model="search" placeholder="请输入搜索关键词" class="fixed-top-item" />
		<van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
			<!-- 轮播图 -->
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
				<van-swipe-item v-for="(image, index) in banner" :key="index">
					<van-image :src=" image.path" />
				</van-swipe-item>
			</van-swipe>
			<!-- 通知 -->
			<van-notice-bar left-icon="volume-o" :scrollable="false" style="height: 30px; margin-bottom: 10px;">
				<van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
					<van-swipe-item v-for="(item, index) in notice" :key="index">{{item.title}}</van-swipe-item>
				</van-swipe>
			</van-notice-bar>
			<!-- 页面导航（分类图标） -->
			<van-grid clickable :column-num="4" class="mb-10">
				<van-grid-item icon="home-o" text="路由跳转" to="" />
				<van-grid-item icon="search" text="URL 跳转" url="" />
				<van-grid-item icon="search" text="URL 跳转" url="" />
				<van-grid-item icon="search" text="URL 跳转" url="" />
			</van-grid>
			<!-- 推荐商品cell单元格 -->
			<van-cell title="推荐商品" is-link value="查看更多" :border="false" url="#/classify" />
			<!-- 商品列表 -->
			<van-grid :border="false" :column-num="2" class="mb_50" :gutter="5">
				<van-grid-item v-for="(item, index) in goodlist" :key="index" @click="$navto('/goods/'+ item.id)" style="width: 160px;">
					<div class="images_out">
						<img :src=" item.img " />
					</div>
					<div class="goods_card_name">{{item.name}}</div>
					<div class="price">￥{{item.cost_price}}</div>
				</van-grid-item>
			</van-grid>
		</van-pull-refresh>
	</div>
</template>

<script>
	import {
		home
	} from '../../common/api/web/home.js'
	import {
		Lazyload
	} from 'vant'
	export default {
		data() {
			return {
				isLoading: false,
				search: '',
				banner: [],
				notice: [],
				goodlist: []
			}
		}, //data
		methods: {
			zhuxiao() {
				localStorage.setItem('token', '')
				// this.$router.push('/login')
			},
			onRefresh() {
				this.initData()
				setTimeout(() => {
					this.$toast('刷新成功')
					this.isLoading = false;
					// this.count++;
				}, 1000);
			},
			// 获取数据
			initData() {
				// let params = {}
				// login(params).then(function(res) {

				// }) 
				let that = this;
				home({}).then(function(res) {
					// console.log(res)
					let map = res.data
					// console.log(map)
					if (res.code == 200) {
						that.banner = map.banner
						that.notice = map.notice
						that.goodlist = map.goodlist
					}
				})
			},

		}, //methods
		mounted() {
			this.initData()
		}
	}
</script>

<style>
	.notice-swipe {
		height: 40px;
		line-height: 40px;
	}

	.my-swipe .van-swipe-item {
		color: #fff;
		padding-top: 50px;
		font-size: 20px;
		/* line-height: 150px; */
		height: auto;
		/* width: auto; */
		text-align: center;
		/* background-color: #39a9ed; */
	}

	.price {
		font-size: 0.875rem;
		color: orangered;
		text-align: left;
		width: 96%;
	}

	.images_out {
		width: 7.5rem;
		height: 7.5rem;
		overflow: hidden;
		display: flex;
		justify-content: center;
	}

	.images_list {
		width: auto;
		height: 168px;
	}

</style>
