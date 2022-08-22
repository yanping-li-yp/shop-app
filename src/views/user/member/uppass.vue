<template>
	<div>
		<!-- 顶部 -->
		<van-nav-bar title="修改密码" left-arrow @click-left="$back()" />

		<!-- 密码 -->
		<van-field v-model="oldpassword" label="原始密码" placeholder="原始密码"/>
		<van-field v-model="newpassword" label="新密码" placeholder="新密码"/>
		<van-field v-model="repassword" label="确认新密码" placeholder="确认新密码"/>
		
		<!-- 保存按钮 -->
		<van-button class="button" square color="linear-gradient(to right, #ff6034, #ee0a24)" native-type="submit" size="large">保存</van-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				oldpassword: '',
				newpassword: '',
				repassword: '',
			}
		}, //data
		methods: {
		}, //methods
	}
</script>

<style>
	.button{
		position: fixed;
		bottom: 0px;
		height: 2.5rem;
	}
</style>
