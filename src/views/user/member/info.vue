<template>
	<div>
		<van-nav-bar title="个人信息" left-arrow @click-left="$back()" />

		<!-- 表单 -->
		<van-cell-group>
			<!-- 头像部分，使用插槽的方式引用 -->
			<van-cell>
				<template #title>
					<span class="custom-title">头像</span>
					<van-uploader :after-read="afterRead" style="float: right;">
						<van-image round width="45px" height="45px" :src="photo"/>
					</van-uploader>
				</template>
			</van-cell>
			<!-- 表单 -->
			<van-form>
				<van-field v-model="name" label="昵称" placeholder="请输入用户名"></van-field>
				<van-field readonly label="性别" v-model="sex" placeholder="请选择性别" right-icon="arrow-down" @click="selectSex"></van-field>
				<van-field label="生日" v-model="day" readonly right-icon="arrow-down" @click="selectDay"></van-field>
				<!-- 保存按钮 -->
				<van-button class="button" square color="linear-gradient(to right, #ff6034, #ee0a24)" native-type="submit" size="large">保存</van-button>
				
			</van-form>
		</van-cell-group>
		
		<!-- 性别 -->
		<van-popup v-model="showSex" round position="bottom">
			<van-picker show-toolbar :columns="columns" @cancel="showSex=false" @confirm="onConfirm_sex" />
		</van-popup>
		<!-- 生日 -->
		<van-popup v-model="showDay" round position="bottom">
			<van-picker show-toolbar :columns="dayList" @cancel="showDay=false" @confirm="onConfirm_day" />
		</van-popup>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				photo: "https://img01.yzcdn.cn/vant/cat.jpeg" ,
				name: '',
				sex: '男',
				day: '2021-05-25',
				showSex: false,
				showDay: false,
				columns: [
					{
						id: 1,
						text: '男'
					},{
						id: 2,
						text: '女'
					}
				],
				dayList: [
					{
						text: '2021',
						children: [
							{
								text: '07',
								children: [
									{
										text:'01'
									},{
										text: '02'
									},{
										text: '03'
									},{
										text: '04'
									},{
										text: '05'
									},{
										text: '06'
									}
								],
							}
						],
					},{
						text: '2022',
						children: [
							{
								text: '08',
								children: [
									{
										text:'01'
									},{
										text: '02'
									},{
										text: '03'
									},{
										text: '04'
									},{
										text: '05'
									},{
										text: '06'
									}
								],
							}
						],
					}
				]
			};
		},
		methods: {
			// 上传回调
			afterRead(file){
				let formdata = new FormData() //上传阿里云，七牛云存储
				formdata.append('file', file.file)
				this.$http.post('http://shop.ueoa.net/file/upload', formdata).then(res => {
					
					if(res.data.code == 200) {
						console.log(res.data);
					}
				})
				this.photo = file.content;
 			},
			selectSex(){
				this.showSex = true
			},
			selectDay(){
				this.showDay = true
			},
			onConfirm_sex(value){
				this.sex = value.text;
				this.showSex = false
			},
			onConfirm_day(value){
				this.day = value[0] + '-' + value[1] + '-' + value[2];
				        this.showDay = false;
			}


		}, //methods
	};
</script>

<style>
	.custom-title{
		height: 40px;
		line-height: 40px;
		display: inline-block;
	}
	.button{
		position: fixed;
		bottom: 0px;
		height: 2.5rem;
	}
</style>
