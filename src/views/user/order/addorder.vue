<template>
	<div>
		<!-- 顶部 -->
		<van-nav-bar title="提交订单" left-arrow @click-left="$back()" />
		<!-- 联系人 -->
		<van-contact-card type="edit" :name="currentContact.name" :tel="currentContact.tel" @click="chooseAddress"
			v-show="!isShowAddress" />
		<van-button type="danger" block v-show="isShowAddress" @click="chooseAddress">选择收货人</van-button>
		<!-- 商品卡片 -->
		<van-card v-for="(item,index) in goodsData" :key="index" :num="item.num" :price="item.price/100"
			:title="item.goods.name" :thumb="item.goods.img">
			<template #desc>
				<span v-for="(desc,index) in item.data" style="color: #a5a5a5;">
					<span v-for="(item,index) in desc">
						{{item.title}}:{{item.name}}
					</span>
				</span>
			</template>
		</van-card>

		<van-cell-group>
			<van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />
			<van-cell title="发票(费用6%)" :value="invoice/100" @click="openPop=true"></van-cell>
			<van-cell title="运费" :value="freight"></van-cell>
			<van-field v-model="message" rows="2" autosize label="留言" type="textarea" maxlength="50" placeholder="请输入留言"
				show-word-limit />
		</van-cell-group>

		<van-submit-bar :price="totalPrice" button-text="提交订单" tip="你的收货地址不支持同城送, 我们已为你推荐快递" tip-icon="info-o"
			@submit="onSubmit" />

		<!-- 优惠券列表 -->
		<van-popup v-model="showList" round position="bottom" style="height: 90%; padding-top: 4px;">
			<van-coupon-list :coupons="coupons" :chosen-coupon="chosenCoupon" :disabled-coupons="disabledCoupons"
				@change="onChange" @exchange="onExchange" />
		</van-popup>

		<!-- 发票 -->
		<van-popup v-model="openPop" round position="bottom" :style="{ height: '40%' }">
			<van-field name="radio" lable="发票类型" class="mt-20">
				<template #input>
					<van-radio-group v-model="invoice_attr['invoice_type']" direction="horizontal">
						<van-radio name="1">个人</van-radio>
						<van-radio name="2">单位</van-radio>
					</van-radio-group>
				</template>
			</van-field>

			<van-field v-model="invoice_attr['invoice_title']" name="发票抬头" label="发票抬头" />

			<van-field v-if="invoice_attr['invoice_type']=='2'" v-model="invoice_attr['invoice_desc']" name="税号"
				label="税号" placeholder="纳税人识别号" />

			<van-row type="flex" justify="center" class="mt-10">
				<van-button type="primary" class="mr-10" @click="invoiceAtr(1)">保存</van-button>
				<van-button type="default" @click="invoiceAtr(2)">取消</van-button>
			</van-row>
		</van-popup>

	</div>
</template>

<script>
	import {
		voucherList,
		voucherChange
	} from '../../../common/api/web/user.js'
	import {
		orderAct
	} from '../../../common/api/web/order.js'
	import {
		uuid
	} from 'vue-uuid';
	const coupon = {};
	export default {
		data() {
			return {
				currentContact: {},
				goodsData: {},
				message: '',
				showList: false,
				chosenCoupon: -1,
				coupons: [coupon],
				disabledCoupons: [],
				voncer: 0, //选中的优惠券的金额
				totalPrice: 0,
				isShowAddress: false,
				freight: 10, //运费
				openPop: false, //发票弹窗
				invoice: 0, //发票金额
				invoice_attr: {
					invoice_type: "1",
					invoice_title: '',
					invoice_desc: ''
				},
			}
		}, //data
		mounted() {
			// 收货人部分
			// this.$cache_set('select_address', '')
			let address = this.$cache_get('select_address');
			if (address != '' && address != undefined) {
				this.currentContact = address
			} else {
				this.isShowAddress = true;
			}

			let orderData = [];
			orderData = this.$cache_get('order_goods')
			this.goodsData = orderData;
			// console.log(this.goodsData)
			// 计算总价
			this.totalCost();

			// 优惠券
			this.initVonice();


		},
		methods: {
			// 获取用户默认数据
			initData() {},
			async initVonice() {
				let res = await voucherList();
				// console.log(res)
				if (res.code == 200) {
					this.coupons = res.data.coupons;
				}
			},
			async onSubmit() {
				if (this.currentContact == {}) {
					this.$toast('请添加收货地址');
					return;
				}

				let goodsArray = [];
				this.goodsData.forEach(function(item, index) {
					// console.log(item)
					let data = {
						'num': item.num,
						'skuid': item.skuid,
						'sku': item.data,
						'goodsid': item.goodsId,
					}
					// console.log(data)
					goodsArray.push(data);
				});

				// 获取优惠券信息
				// console.log(this.coupons)
				let coupon_id = 0;
				if (this.chosenCoupon > -1) {
					coupon_id = this.coupons[this.chosenCoupon]['id'];
				}
				// 判断是否开发票
				let is_invoice = 0;
				if (this.invoice > 0){
					is_invoice = 1;
				}
				
				let params = {
					address_id: this.currentContact.id,
					goods: goodsArray,
					coupon_id: coupon_id,
					is_invoice: is_invoice,
					invoice_title: this.invoice_attr['invoice_title'],
					invoice_type: this.invoice_attr['invoice_type'],
					invoice_desc: this.invoice_attr['invoice_desc'],
					user_remark: this.message
				}
				
				// console.log(params)
				let res = await orderAct(params);
				// console.log(res)
				if(res.code == 200) {
					let orderid = res.data.order_id;
					this.$router.push('payment?id=' + orderid + '&type=1');
				}

				// this.$router.push('/payment')
			},
			// 选择优惠券
			onChange(index) {
				if (index > -1) {
					this.voncer = this.coupons[index].value;
				} else {
					this.voncer = 0;
				}
				this.showList = false;
				this.chosenCoupon = index;
				this.randomOrder();
				this.totalCost()
				this.totalPrice = this.totalPrice + this.invoice
			},
			// 兑换优惠券
			async onExchange(account) {
				let res = await voucherChange({
					account: account
				});
				if (res.code == 200) {
					this.coupons.push(res.data);
				} else {
					this.$toast(res.msg)
				}
			},
			//发票类型 1：保存   2：取消
			invoiceAtr(id) {
				this.totalCost();
				if (id == 1) {
					//保存处理
					if (this.invoice_attr['invoice_title'] == '') {
						this.$toast('请填写发票抬头');
						return;
					}
					if (this.invoice_attr['invoice_desc'] == '' && this.invoice_attr['invoice_type'] == '2') {
						this.$toast('请填写发票税号');
						return;
					}
					this.openPop = false;
					this.invoice = this.totalPrice * 0.06 == 0 ? 10 : (this.totalPrice - this.freight * 100) * 0.06
					this.totalPrice = this.totalPrice + this.invoice;
				} else {
					// 取消处理
					this.invoice = 0;
					this.invoice_attr = {
						invoice_type: "1",
						invoice_title: '',
						invoice_desc: ''
					};
					this.openPop = false;
					this.totalPrice = this.totalPrice + this.invoice;
				}
			},
			// 计算总价
			totalCost() {
				var that = this;
				this.totalPrice = 0;
				for (let i = 0; i < this.goodsData.length; i++) {
					that.totalPrice += that.goodsData[i].price * that.goodsData[i].num;
				}
				// 优惠券
				this.totalPrice = this.totalPrice - this.voncer + this.freight * 100;
			},
			chooseAddress() {
				this.$navto('/address_list')
			},
			//订单号
			randomOrder() {
				console.log(uuid.v4());
				const now = new Date();
				let year = now.getFullYear().toString();
				let month = (now.getMonth() + 1).toString();
				let day = now.getDate().toString();
				let hour = now.getHours().toString();
				let minutes = now.getMinutes().toString();
				let seconds = now.getSeconds().toString();
				// 存放订单号
				let num = '';
				// N位随机数(加在时间戳后面)
				for (var i = 0; i < length; i++) {
					num += Math.floor(Math.random() * 10);
				}
				let a = year + month + day + hour + minutes + seconds + num;
				// console.log(a);
			}
		}
	}
</script>

<style>
</style>
