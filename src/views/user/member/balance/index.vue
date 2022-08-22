<template>
	<div class="gray-bg">
		<van-nav-bar title="我的余额" left-arrow @click-left="onClickLeft" />
		
		<van-cell class="balance_box">
			<template #title>
				<van-row class="balance_desc">账户余额（元）</van-row>
			</template>
			<template #label>
				<van-row class="balance">1600.00</van-row>
			</template>
		</van-cell>
		
		<van-cell title="账户充值" is-link icon="refund-o" to="recharge"></van-cell>
		<van-cell title="余额提现" is-link icon="after-sale" to="/withdraw_cash"></van-cell>
		<van-cell title="余额明细" is-link icon="todo-list-o" to="detail"></van-cell>
		<van-cell title="提现记录" is-link icon="clock-o"></van-cell>
		<van-cell title="我的银行卡" is-link icon="balance-pay" to="bankcard"></van-cell>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		}, //data
		methods: {
			onClickLeft(){
				this.$router.go('-1')
			}
		}
	}
</script>

<style>
	.balance_box{
		background-color: rgb(255,113,89);
		height: 108px;
		margin-bottom: 10px;
	}
	.balance_desc{
		color: white;
		margin-top: 10px;
	}
	.balance{
		color: white;
		font-size: 34px;
		line-height: 50px;
		margin-left: 10px;
	}
</style>
