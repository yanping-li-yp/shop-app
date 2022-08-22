<template>
	<div>
		<!-- 顶部跳转按钮 -->
		<div class="left_menu" @click="$back()">
			<van-icon name="arrow-left" />
		</div>
		<!-- 商品图片轮播 -->
		<van-swipe class="goods_swiper" :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="(picture, index) in goods.imgs" :key="index">
				<img :src="picture" class="goods_pictures" />
			</van-swipe-item>
		</van-swipe>
		<!-- 商品信息 -->
		<van-cell center :title="goods.name">
			<template #label>
				<span class="goods_price">￥{{goods.cost_price}}</span>
			</template>
		</van-cell>
		<!-- 运费、剩余 -->
		<van-cell center>
			<template #title>
				<div class="goods_express">运费：{{goods.weight}}</div>
				<span>剩余：{{goods.store_nums}}</span>
			</template>
		</van-cell>
		<!-- 商品相关参数 -->
		<van-cell center is-link :title="guige" @click="buy(1)">
			<!-- <template #label>
				<div class="goods_desc">{{guige}}</div>
			</template> -->
			<template #icon>
				<van-icon name="shop-o" class="goods_icon" />
			</template>
		</van-cell>
		<van-cell-group>
			<!-- 店铺 -->
			<van-cell center is-link value="进入店铺">
				<template #title>
					<span class="custom-title">有赞的店</span>
					<van-tag type="danger">官方</van-tag>
				</template>
				<template #icon>
					<van-icon name="shop-o" class="shop_icon" />
				</template>
			</van-cell>
			<!-- 线下门店 -->
			<van-cell center is-link title="线下门店">
				<template #icon>
					<van-icon name="location-o" class="shop_icon" />
				</template>
			</van-cell>
		</van-cell-group>

		<!-- Tag标签 -->
		<van-tabs v-model="active" style="min-height:400px;">
			<van-tab title="商品详情">
				<!-- html -->
				<van-empty v-if="goods.content==''" image="search" description="暂无详情" />
				<van-row v-else>
					<div v-html="goods.content" class="pd-10-20"></div>
				</van-row>
			</van-tab>

			<van-tab title="商品参数">
				<!-- html -->
				<van-empty v-if="content==''" image="error" description="暂无详情" />
				<van-row v-else>
					{{can}}
				</van-row>
			</van-tab>

			<van-tab title="买家评论">
				<!-- html -->
				<van-empty v-if="commend==''" image="search" description="暂无详情" />
				<van-row v-else>
					{{commend}}
				</van-row>
			</van-tab>
		</van-tabs>

		<!-- 底部加入购物车 -->
		<van-goods-action>
			<van-goods-action-icon icon="chat-o" text="客服" @click="sorry" />
			<van-goods-action-icon :badge="cartLength" icon="cart-o" text="购物车" to="/cart" />
			<van-goods-action-button type="warning" text="加入购物车" @click="show=true" />
			<van-goods-action-button type="danger" text="立即购买" @click="show=true" />
		</van-goods-action>


		<!-- 商品规格 -->
		<van-sku v-model="show" :sku="sku" :goods="goodstype" :goods-id="goodsId" :quota="quota" :quota-used="quotaUsed"
			:hide-stock="sku.hide_stock" :message-config="messageConfig" @buy-clicked="onBuyClicked"
			@add-cart="onAddCartClicked" ref="sku" />
	</div>
</template>

<script>
	import {
		goodsView
	} from '../../common/api/web/goods.js'
	export default {
		data() {
			return {
				guige:'点击选择',
				goods: {},
				active: 2,
				content: '',
				can: '',
				commend: '',
				show: false,
				goodsId: 1,
				quota: 0, //限购数，0 表示不限购
				quotaUsed: 0, //已经购买过的数量
				sku: {
					tree: [],
					// 所有商品属性组合
					list: [],
					price: '', // 默认价格（单位元）
					stock_num: 23, // 商品总库存
					collection_id: 2261, 
					none_sku: false, // 是否无规格商品
					hide_stock: false // 是否隐藏剩余库存

				}, //sku
				goodstype: {picture: ''},//未选择属性或没有属性时的默认图片
				messageConfig: {
					// 数据结构见下方文档
				},
				cartLength: ''
			}
		}, //data
		methods: {
			initdata() {
				let that = this;
				goodsView({
					goods_id: this.goodsId
				}).then(function(res) {
					// console.log(res.data)
					if (res.code == 200) {
						that.goods = res.data
						// console.log(res.data.sku)
						that.goodstype.picture = res.data.img
						that.sku.price  = res.data.sell_price;
						that.sku.tree = res.data.sku.tree;
						that.sku.list = res.data.sku.list;
						// that.goods.pictures = res.data.imgs
					}
				})
			},
			sorry() {
				this.$toast('暂无后续逻辑~')
			},
			onBuyClicked() {
				let params = [];
				params['0'] = this.selectGoodsInfo()
				this.$router.push({name:'addorder', params:{data:params}})
				//直接存储数据到本地
				let buyNow = [];
				buyNow['0'] = this.selectGoodsInfo();
				this.$cache_set('order_goods', buyNow)
				// console.log(JSON.parse(localStorage.getItem('order_goods')))
			},
			// 确定加入购物车
			onAddCartClicked() {
				let goods_data = this.selectGoodsInfo()
				// 先获取购物车数据（如果购物车没有相同商品数据，则unshift加入顶部，如果有，相同商品的数量增加）
				let n = 0;
				let chartGoods = this.$cache_get('cart')
				if (chartGoods != null && chartGoods != '') {
					chartGoods.forEach(function(item, index, array) {
						if (item.skuid == goods_data.skuid) {
							chartGoods[index]['num'] += 1;
							n++;
						}
					})
				} else {
					chartGoods = [];
				}
								
				if (n == 0) {
					chartGoods.unshift(goods_data);
				}
				this.$cache_set('cart',chartGoods)
				this.$toast('加入成功');
				this.show = false;
				
				// 改变购物车顶部的小图标
				this.cartLength = this.$get_cart_length();
			},
			selectGoodsInfo(){
				let sku = this.$refs.sku;
				let select_sku = sku.selectedSku;
				let select_data = sku.getSkuData();
				let data = [];
				for (var key in select_sku) {
					this.sku.tree.forEach(function(item, index, array) {
						if (item['k_s'] == key) {
							var newArray = item['v'].filter(function(x) {
								return x.id == select_sku[key];
							});
							newArray[0]['title'] = item['k']; //加名称
							data.push(newArray);
						}
					});
				}
				select_data['data'] = data;
				select_data['goods'] = this.goods;
				// 商品规格
				let goods_data = {};
				goods_data['goodsId'] = select_data['goodsId']
				goods_data['num'] = select_data['selectedNum'];
				goods_data['price'] = select_data['selectedSkuComb']['price'];
				goods_data['stock_num'] = select_data['selectedSkuComb']['stock_num'];
				goods_data['skuid'] = select_data['selectedSkuComb']['id'];
				goods_data['data'] = select_data['data'];
				goods_data['goods'] = select_data['goods'];
				return goods_data;
			}
		}, //methods
		mounted() {
			let id = this.$route.params.id;
			if (!id) {
				rhis.$toast('未找到相关商品');
				return;
			} else {
				this.goodsId = id;
			}
			this.initdata();
			
			this.cartLength = this.$get_cart_length();
			// localStorage.setItem('cart', '')
			// console.log(localStorage.getItem('cart'))
		}
	}
</script>

<style>
	.left_menu {
		width: 30px;
		height: 30px;
		color: #333;
		background-color: #e8e8e8;
		text-align: center;
		line-height: 38px;
		font-size: 25px;
		border-radius: 50%;
		position: absolute;
		position: fixed;
		z-index: 3333;
		margin: 10px;
	}

	.goods_swiper {
		color: #fff;
		height: auto;
		text-align: center;
	}

	.goods_pictures {
		width: 100%;
	}

	.goods_price {
		font-size: 14px;
		color: #333;
	}

	.goods_express {
		display: inline-block;
		width: 41%;
	}

	.goods_desc {
		font-size: 13px;
		color: #333;
	}

	.goods_icon {
		font-size: 18px;
		position: relative;
		/* margin-top: -22px; */
		margin-right: 6px;
	}

	.shop_icon {
		font-size: 18px;
		margin-right: 6px;
	}
</style>
