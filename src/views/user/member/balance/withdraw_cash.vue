<template>
	<div class="gray-bg">
		<van-nav-bar title="余额提现" left-arrow @click-left="onClickLeft" />

		<van-cell title="请选择银行卡" is-link>
			<template #icon>
				<van-image src="http://zhongjun.ueoa.net/wap/static/image/yl.png" width="100px" height="30px">
				</van-image>
			</template>
		</van-cell>

		<van-cell title="" :border="false" style="margin-top: 10px;">
			<template #label>
				<van-row style="color: #333;">最低提现金额 0.01 元（收取 0% 服务费）</van-row>
			</template>
		</van-cell>
		
		<van-field v-model="value" clearable left-icon="after-sale" placeholder="输入提现金额" />

		<van-cell title="">
			<template #label>
				<van-row style="color: #333;">可用余额 1600.00 元</van-row>
			</template>
		</van-cell>
		
		<van-button type="default" block class="btn">确认提交</van-button>


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
			onClickLeft() {
				this.$router.go('-1')
			}
		}
	}
</script>

<style>
	.btn{
		position: absolute;
		color: #9e9e9e;
		bottom: 0;
	}
</style>
