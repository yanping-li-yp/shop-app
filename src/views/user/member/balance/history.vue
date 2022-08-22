<template>
	<div class="gray-bg">
		<van-nav-bar title="我的足迹" left-arrow @click-left="onClickLeft" />
		
		
		<van-swipe-cell>
		  <van-cell>
			  <template #icon>
				  <van-image src="http://zhongjun.ueoa.net/static/uploads/images/2021/08/02/1627914790610802263dac1.jpeg" class="images"></van-image>
			  </template>
			  <template #label>
				  <div style="font-size: 18px;color: orangered;margin-top: 24px;">￥ 2100</div>
				  <van-row>2021-08-29 22:04:56</van-row>
			  </template>
			  <template #title>
				  <span>江西三清山婺源3日自由行定制</span>
			  	<van-icon name="arrow" class="pay_icon_right" />
			  </template>
		  </van-cell>
		  <template #right>
			  <van-button square text="收藏" type="info" class="delete-button"/>
		    <van-button square text="删除" type="danger" class="delete-button"/>
		  </template>
		</van-swipe-cell>
		
		
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
  .goods-card {
    margin: 0;
    background-color: @white;
  }

  .delete-button {
    height: 100%;
  }
  .images {
  	width: 80px;
  	height: 80px;
  	overflow: hidden;
  	display: flex;
  	justify-content: center;
	margin-right: 5px;
  }
  .pay_icon_right {
  	font-size: 16px;
  	/* line-height: 100px; */
	float: right;
	margin-top: 32px;
  }
</style>
