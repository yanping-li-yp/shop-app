<template>
	<div>
		<van-nav-bar title="找回密码" left-arrow @click-left="$back()"></van-nav-bar>

		<van-form>
			
			<van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
				:rules="[{ required: true, message: '请填写用户名' }]" />
				
			<van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
				:rules="[{ required: true, message: '请填写密码' }]" />
				
				<van-field v-model="repassword" type="password" name="确认密码" label="确认密码" placeholder="密码"
					:rules="[{ validator, message: '两次输入密码不一致' }]" />
					
					<van-field v-model="phone" type="text" name="手机号" label="手机号" placeholder="手机号"
						:rules="[{check_phone, message: '请填写正确的手机号'}]" />
						
						<van-field v-model="code" type="text" name="短信验证码" label="短信验证码" placeholder="验证码"
							:rules="[{ required: true, message: '请填写短信验证码' }]" >
							<template #button>
								<van-button :disabled="get_code" size="small" type="primary" @click="getCode()">{{msgtxt}}</van-button>
							</template>
							</van-field>
							
			<div style="margin: 16px;">
				<van-button round block type="info" native-type="submit"  @click="onSubmit">提交</van-button>
			</div>
		</van-form>


	</div>
</template>

<script>
	import {forget} from '../../common/api/web/user.js'
	export default {
		data() {
			return {
				username: '',
				password: '',
				repassword: '',
				phone: '',
				code: '',
				ycode: '',  //邀请码
				repassword_message: '',
				check_phone: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
				msgtxt: '获取验证码',
				fastid: 0,
				get_code: false
			};
		},
		methods: {
			validator (val) {
				// console.log(this.password)
				// console.log(val)
				if (val != this.password){
					return false;
				}else{
					return
				}
			},
			// 获取短信验证码
			getCode(){
				if(this.phone == ''){
					this.$toast('请输入手机号码')
				}else {
					this.fastid = 1;
					this.setCodetime();
				}
			},
			// 倒计时
			setCodetime(){
				let second = 60;
				const timer = setInterval(() => {
					second--;
					if(second){
						this.get_code = true
						this.msgtxt = second+'秒后获取';
					}else {
						this.get_code = false
						clearInterval(timer);
						this.msgtxt = '获取验证码';
					}
				},1000);
			},
			onSubmit() {
				if(this.fastid == 0){
					this.$toast('请点击获取验证码')
					return;
				}
				let params = {
					name: this.username,
					password: this.password,
					repassword: this.repassword,
					code: this.code,
					// ycode: this.code,
					tel: this.phone
				}
				let that = this;
				this.$toast.loading();
				this.$http.post('https://www.showdoc.cc/server/api/user/login',params).then(function(res){
				// forget(params).then(function(res){
					console.log(localStorage.getItem('token'))
					console.log(res)
					if(res.code == 200) {
						that.fastid = 0;
						that.username = '';
						that.password = '';
						that.repassword = '';
						that.code = '';
						that.phone = '';
						setTimeout(function(){
							that.$navto('login')
						},2000)
					}
					that.$toast(res.msg)
				})
			}
		}, //methods
	};
</script>

<style>
</style>
