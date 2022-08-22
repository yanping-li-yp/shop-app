<template>
	<div>
<!-- 		<van-button type="primary">主要按钮</van-button>
		<van-button type="warning">警告按钮</van-button>
		<van-button type="danger">危险按钮</van-button>
		 -->
		<van-pull-refresh
		  v-model="isLoading"
		  success-text="刷新成功"
		  @refresh="onRefresh"
		>
		  <p>刷新次数: {{ count }}</p>
		</van-pull-refresh>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	export default {
	  data() {
	    return {
	      count: 0,
	      isLoading: false,
	    };
	  },
	  methods: {
	    onRefresh() {
	      setTimeout(() => {
	        Toast('刷新成功');
	        this.isLoading = false;
	        this.count++;
	      }, 1000);
	    },
	  },
	};
</script>

<style>
</style>
