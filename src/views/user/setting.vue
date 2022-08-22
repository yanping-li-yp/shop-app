<template>
	<div>
		<!-- 顶部导航 -->
		<van-nav-bar title="系统设置" left-arrow @click-left="$back()" />
		<!-- cell单元格 -->
		<van-cell title="个人信息" is-link to="member/info" />
		<van-cell title="修改密码" is-link to="member/uppass" />
		<van-cell title="清除缓存" is-link to="" />
		<van-cell title="关于我们" is-link to="" />
		<van-cell title="退出" @click="logout()" />
	</div>
</template>

<script>
	export default {
		methods: {
			// 退出登录
			logout(){
				let that = this
				this.$dialog.confirm({
					message: '您确定退出登录吗？'
				}).then(() => {
					localStorage.setItem('token', '');
					that.$router.push('/login')
				}).catch(err => err)
			},
		}, //methods
	};
</script>

<style>
</style>
