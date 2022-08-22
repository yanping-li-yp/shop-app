<template>
	<div>
		<!-- 顶部导航 -->
		<van-nav-bar title="登录" />
		<div class="main">
			<div class="photo">
				<van-image round width="100" height="100" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
			</div>
			<!-- 表单 -->
			<van-form @submit="onSubmit">
				<van-field v-model="name" name="name" label="用户名" placeholder="用户名"
					:rules="[{ required: true, message: '请填写用户名' }]" />
				<van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
					:rules="[{ required: true, message: '请填写密码' }]" />
					<!-- 提交按钮 -->
				<div style="margin: 16px;">
					<van-button round block type="info" native-type="submit">提交</van-button>
				</div>
			</van-form>
			
		</div> <!-- end of main -->

		<van-row style="display: flex;justify-content: center;color: #333">
		  <van-col span="11" style="text-align: center;" @click="$navto('reg')">注册</van-col>
		  <van-col span="13" style="text-align: center;" @click="$navto('forget')">找回密码</van-col>
		</van-row>

	</div>
</template>

<script>
	import qs from 'qs'
	import {login} from '../../common/api/web/user.js'
	export default {
		data() {
			return {
				name: '',
				password: ''
			}
		}, //end of data
		methods: {
			onSubmit(values) {
				/* let host = 'http://shop.ueoa.net/manage/login'
				// get(host+'?'+qs.stringify(values)).then()
				this.$http.post(host,qs.stringify(values)).then(res => {
					// console.log(res.data.data.token)
					if(res.data.code == 200){
						localStorage.setItem('token',res.data.data.token);
						this.$router.push('/index');
					}
					this.$toast(res.data.msg)
				}) */
				
				// 封装
				let params = {
					name: values.name,
					password: values.password
				};
				// console.log(params)
				login(params).then((res) => {
					// console.log(res)
					if(res.code == 200){
						localStorage.setItem('token',res.data.token);
						this.$router.push('/index');
					}
					this.$toast(res.msg)
				})
			},
		}
	}
</script>

<style>
	.photo {
		width: 100%;
		height: auto;
		text-align: center;
		margin: 1.25rem 0px;
	}
</style>
