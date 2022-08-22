<template>
	<div class="gray-bg">
		<div class="fixed-top-item">
			<van-nav-bar title="商品分类" left-arrow @click-left="$back()" class="type_nav" />
			
			<!-- 搜索框 -->
			<div class="search_box type_search">
				<van-search v-model="search" placeholder="请输入搜索关键词" shape="round" left-icon="" @search="onSearch"
					@clear="onCancel">
					<template #right-icon>
						<van-icon name="search" @click="onSearch"></van-icon>
					</template>
				</van-search>
			</div>
			
			<van-dropdown-menu class="type_tab">
				<van-dropdown-item v-model="isOption['active']" :options="selectOption['active']"
					@change="dropSelect('active')" />
				<van-dropdown-item v-model="isOption['price']" :options="selectOption['price']"
					@change="dropSelect('price')" />
				<van-dropdown-item v-model="isOption['sort']" :options="selectOption['sort']" @change="dropSelect('sort')" />
					<van-dropdown-item v-model="value4" :options="option4" />
			</van-dropdown-menu>
		</div>

		<div style="margin-top: 145px;">
			<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
				<van-empty image="error" description="没有商品" v-if="dataList.length==0" />
				<van-list v-else v-model="isLoading" :offset="10" :immediate-check="isimmediate" :finished="finished"
					finished-text="没有更多了" @load="onLoad">


					<!-- 竖排 -->
					<van-cell style="margin-bottom: 10px;" v-show="value4 == 0" v-for="(item, index) in dataList"
						@click="$navto('/goods/'+ item.id)" :key="index">
						<template #icon>
							<van-image :src="item.img" class="images"></van-image>
						</template>
						<template #label>
							<div style="font-size: 18px;color: orangered;margin-top: 20px;">￥ {{item.sell_price}}</div>
							<!-- <van-row>{{item.commend}}</van-row> -->
						</template>
						<template #title>
							<span class="nameStyle">{{item.name}}</span>
							<van-icon name="shopping-cart-o" class="pay_icon_right" />
						</template>
					</van-cell>


					<!-- 横排 -->

					<van-grid :border="false" :column-num="2" v-show="value4 == 1" :gutter="10">
						<van-grid-item v-for="(item, index) in dataList" :key="index" style="width: 160px;"
							@click="$navto('/goods/'+ item.id)">
							<div class="images_out">
								<img :src=" item.img " />
							</div>
							<div class="goods_card_name">{{item.name}}</div>
							<div class="price mt-10">￥{{item.sell_price}}
								<van-icon name="shopping-cart-o" class="cart" />
							</div>
						</van-grid-item>
					</van-grid>

				</van-list>
			</van-pull-refresh>
		</div>

	</div>
</template>

<script>
	import {
		goodsList,
		goodsSpec
	} from '../../common/api/web/goods.js'
	export default {
		data() {
			return {
				pid: 0,
				page: 1,
				count: 0,
				isLoading: false,
				loading: false,
				finished: false,
				isimmediate: false,
				search: '',
				// active: 0,
				selectOption: {},
				isOption: {},
				value4: 0,
				option4: [{
						text: '竖排',
						value: 0
					},
					{
						text: '横排',
						value: 1
					},
				],
				dataList: [],

			}
		}, //data
		mounted() {
			this.pid = this.$route.params.id;
			this.initData();
			this.initSpec();
		},
		methods: {
			// 筛选属性
			async initSpec() {
				let res = await goodsSpec({
					pid: this.pid
				}); //异步获取
				if (res.code == 200) {
					this.selectOption = res.data.selectOption;
					this.isOption = res.data.isOption;
				}
			},
			async initData() {
				var params = {
					pid: this.pid,
					page: this.page,
					pagesize: 5,
					active: this.isOption['active'],
					sort: this.isOption['sort'],
					price: this.isOption['price'],
					search: this.search,
				};
				let res = await goodsList(params);
				this.page += 1; //请求完 
				if (this.page > res.data.totalPage) {
					this.finished = true; //结束下拉
				}
				if (res.code == 200) {
					this.dataList.push(...res.data.data); //两个数组合并
				} else {
					this.$toast(res.msg);
				}
				this.loading = false;
				this.isLoading = false;
			},
			//搜索
			onSearch() {
				if (this.search == '') {
					this.$toast('奇怪输入搜索关键词');
				} else {
					this.dropSelect();
				}
			},
			//取消
			onCancel() {
				this.search = '';
				this.dropSelect();
			},
			// 下拉事件
			dropSelect() {
				this.page = 1;
				this.dataList = [];
				this.isimmediate = true;
				this.finished = false;
				this.initData();
			},
			//上拉刷新
			onLoad() {
				setTimeout(() => {
					this.initData();
				}, 1000);
			},
			onRefresh() {
				this.finished = false;
				this.loading = true;
				this.onLoad();
			},
		}
	}
</script>

<style>
	.search_box .van-search__content {
		background-color: rgb(233, 233, 233);
	}

	.search_box ::-webkit-input-placeholder {
		color: #8a8a8a;
		font-size: 12px;
	}

	.search_box :-moz-placeholder {
		color: #8a8a8a;
		font-size: 12px;
	}

	.search_box ::-moz-placeholder {
		color: #8a8a8a;
		font-size: 12px;
	}

	.search_box :-ms-input-placeholder {
		color: #8a8a8a;
		font-size: 12px;
	}

	.search_box ::-ms-input-placeholder {
		color: #8a8a8a;
		font-size: 12px;
	}

	.search_box ::placeholder {
		color: #8a8a8a;
		font-size: 12px;
	}

	.images {
		width: 80px;
		height: 80px;
		overflow: hidden;
		display: flex;
		justify-content: center;
		margin-right: 5px;
	}

	.pay_icon_right {
		font-size: 22px;
		/* line-height: 100px; */
		float: right;
		margin-top: 32px;
	}

	.cart {
		color: #333;
		float: right;
		font-size: 22px;
		line-height: 12px;
	}

	.type_nav,
	.type_search,
	.type_tab {
		position: absolute;
		width: 100%;
	}

	.type_search {
		margin-top: 45px;
		z-index: 222;
	}

	.type_tab {
		margin-top: 97px;
		z-index: 222;
	}

	.images_out {
		width: 168px;
		height: 168px;
		overflow: hidden;
		display: flex;
		justify-content: center;
	}

	.nameStyle {
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 14rem;
	}

	.price {
		font-size: 0.875rem;
		color: orangered;
		text-align: left;
		width: 96%;
	}
</style>
