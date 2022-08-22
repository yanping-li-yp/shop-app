<template>
	<div>
		<!-- 顶部 -->
		<van-nav-bar title="购物车" />
		<van-empty v-if="cart_length == ''" class="custom-image mt-50"
			image="https://img11.360buyimg.com/jdphoto/s180x180_jfs/t18163/292/540553659/74408/adeb7463/5a93c51cN3bb5e37b.png" description="购物车居然是空的!" />
		<!-- 购物车商品 -->
		<van-cell title="商城" icon="shop-o" v-else>
			<template>
				<span :v-show="showDel" @click="deleteGoods()" style="color: #333;">{{cartOpt}}</span>
			</template>
		</van-cell>

		<van-checkbox-group v-model="result" ref="checkboxGroup" @change="checkBoxChange()">

			<van-cell class="cart_storecard mb-10" v-for="(item, index) in cart" :key="item.skuid">
				<!-- :key="item.skuid" -->
				<template #title>
					<div class="cart_title ml-5">{{item.goods.name}}</div>
				</template>
				<template #icon>
					<van-checkbox :name="item.skuid" label-disabled class="mr-8" />
					<van-image :src="item.goods.img" width="80px" height="80px"></van-image>
				</template>
				<template #label>
					<div class="cart_label ml-5" v-for="(data, index) in item.data" :key="index">
						{{data[0].title}}:{{data[0].name}}</div>
					<!-- <div class="cart_label ml-5">系统:{{item.data[0][0].name}}  颜色:{{item.data[1][0].name}}</div> -->
				</template>
				<template>
					<div class="cart_value">￥{{item.price/100}}</div>
					<van-stepper :value="item.num" :max="item.stock_num" input-width="24px" button-size="18px"
						class="mt-30" @change="selectNumChange(item.skuid,item.num)"
						@minus="minusNum(item.skuid,item.num)" @plus="plusNum(item.skuid,item.num)" v-show="!showDel" />
					<van-icon name="delete-o" v-show="showDel" class="mt-10" size="18" @click="deleteBtn(item.skuid)" />
				</template>
			</van-cell>


		</van-checkbox-group>

		<van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit" class="mb_50">
			<van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
		</van-submit-bar>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				value: 1,
				result: [], //包含已选中项
				checked: false,
				total: 0,
				cart: {},
				cartOpt: '编辑',
				showDel: false, //显示删除图标
				cart_length: '1'
			}
		}, //data
		methods: {
			minusNum(id, num) {
				let cart_length = this.cart.length
				for (let i = 0; i < cart_length; i++) {
					if (id == this.cart[i].skuid) {
						this.cart[i].num -= 1;
					}
				}
				this.$cache_set('cart', this.cart)
			},
			plusNum(id, num) {
				let cart_length = this.cart.length
				for (let i = 0; i < cart_length; i++) {
					if (id == this.cart[i].skuid) {
						this.cart[i].num += 1;
					}
				}
				this.$cache_set('cart', this.cart)
			},
			checkBoxChange(a) {
				if (this.$refs.checkboxGroup.children.length == this.result.length) {
					this.checked = true;
					this.totalBill()
				} else {
					this.checked = false;
					this.totalBill()
				}
			},
			// 全选与反选
			checkAll() {
				if (this.checked == false) {
					this.result = []
				} else {
					this.result = []
					for (let i = 0; i < this.$refs.checkboxGroup.children.length; i++) {
						this.result.push(this.cart[i].skuid)
					}
				}
			},
			selectNumChange(id, num) {
				this.totalBill()
			},
			totalBill() {
				this.total = 0;
				let that = this;
				let cart_length = this.cart.length
				this.result.forEach(function(item, index) {
					for (let i = 0; i < cart_length; i++) {
						if (item == that.cart[i].skuid) {
							that.total += (that.cart[i].price * that.cart[i].num)
						}
					}
				})
			},
			deleteGoods() {
				if (this.cartOpt == '完成') {
					this.cartOpt = '编辑'
					this.showDel = false
					this.cart_length = this.$get_cart_length()
				} else {
					this.cartOpt = '完成'
					this.showDel = true
				}
			},
			deleteBtn(id) {
				let that = this
				this.cart.forEach(function(item, index) {
					if (item.skuid == id) {
						// splice(index,num)
						that.cart.splice(index, 1)
					}
				})
				localStorage.setItem('cart', JSON.stringify(this.cart))
				// 更新父组件(购物车长度)
				this.$parent.getCartlength()
			},
			onSubmit() {
				if (this.result == '') {
					this.$toast('请选择商品')
					return
				}
				this.$navto('/addorder')
				// 提交订单时,把选中的商品添加到orderData 中,并保存到本地
				let orderData = [];
				let that = this;
				this.result.forEach(function(item, index) {
					for (let i = 0; i < that.cart.length; i++) {
						if (item == that.cart[i].skuid) {
							orderData.push(that.cart[i])
							that.cart.splice(i, 1)
						}
					}
				})
				this.$cache_set('cart', this.cart)
				this.$cache_set('order_goods', orderData)
			}
		}, //methods
		mounted() {
			let goodslist = this.$cache_get('cart')
			if (goodslist != '' && goodslist != null) {
				this.cart = goodslist
			} else {
				this.cart_length = ''
			}
		}
	}
</script>

<style>
	.cart_storecard {
		background-color: #fafafa;
	}

	.cart_title,
	.cart_label {
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 9.375rem;
	}

	.cart_label {}

	.cart_value {
		width: 5rem;
		float: right;
		color: orangered;
	}

	.custom-image .van-empty__image {
		width: 90px;
		height: 90px;
	}
</style>
