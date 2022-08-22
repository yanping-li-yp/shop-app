<template>
	<div>
		<van-nav-bar title="账户充值" left-arrow @click-left="onClickLeft" />
		
		<van-cell title="当前余额">
			<template>
				<van-row style="color: #333;">￥ 1600.00</van-row>
			</template>
		</van-cell>
		<van-field
		  v-model="value"
		  label="充值金额"
		  placeholder="请输入充值金额"
		  input-align="right"
		/>
		
		
		<van-button type="default" block class="btn" @click="pay">去支付</van-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				value: ''
			}
		}, //data
		methods: {
			onClickLeft(){
				this.$router.go('-1')
			},
			pay(){
				if (this.value == '' || this.value == 0){
					this.$toast('请输入金额！')
					return
				}else {
					this.$router.push('payment')
				}
			}
		}
	}
</script>

<style>
	.btn{
		position: absolute;
		color: white;
		bottom: 0;
		background-color: #000000;
	}
</style>
