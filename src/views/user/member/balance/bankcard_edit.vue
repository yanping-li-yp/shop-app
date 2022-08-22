<template>
	<div>
		<van-nav-bar title="添加银行卡" left-arrow @click-left="onClickLeft" />

		<van-cell-group>
			<van-field v-model="bankcardId" label="银行卡卡号" placeholder="请输入银行卡卡号" />
			<van-field v-model="name" label="持卡人" placeholder="请输入持卡人" />
			<van-field v-model="bankName" label="银行名称" placeholder="请输入银行名称" />
			<van-field v-model="bankType" label="银行卡类型" placeholder="请输入银行卡类型" />
			<van-field v-model="initBankName" label="开户行名" placeholder="请输入开户行名" />
			
				<van-field v-model="initBankAddress" label="开户行地址" right-icon="arrow-down" placeholder="请选择开户行地址" @click="showAddress = true"/>

				<van-popup v-model="showAddress" round position="bottom" style=" height: 320px">
					<van-area :area-list="areaList" @confirm="onConfirm" @cancel="onCancel"/>
				</van-popup>
				

<van-checkbox-group v-model="result" checked-color="rgb(255,113,89)">
  <van-cell-group>
    <van-cell
      clickable
      title="设为默认"
      @click="toggle()"
    >
      <template #right-icon>
        <van-checkbox ref="checkboxes"/>
      </template>
    </van-cell>
  </van-cell-group>
</van-checkbox-group>


			</van-cell-group>


<van-button type="default" block class="btn" @click="addBankcard">添加</van-button>


	</div>
</template>

<script>
	import {
		areaList
	} from '@vant/area-data';
	export default {
		data() {
			return {
				bankcardId: '',
				name: '',
				bankName: '',
				bankType: '',
				initBankName: '',
				initBankAddress: '',
				showAddress: false,
				areaList,
				      result: [],
			}
		}, //data
		methods: {
			onClickLeft() {
				this.$router.go('-1')
			},
			onConfirm(values){
				this.showAddress = false
				for(let i=0; i<3; i++){
					// console.log(values[i].name) 
					this.initBankAddress = this.initBankAddress+' '+ values[i].name
				}
			},
			onCancel(){
				this.showAddress = false;
			},
			toggle() {
				// console.log(this.result)
				
			    },
			addBankcard(){}
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
