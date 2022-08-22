<template>
	<div>
		<!-- 顶部搜索 -->
		<van-search v-model="search" placeholder="请输入搜索关键词" />

		<!-- 侧边导航 -->
		<van-tree-select height="85vh" :items="nav_items" :main-active-index.sync="active" @click-nav="onChange">
			<template #content>
				<!-- 显示内容 -->
				<van-grid :border="false" :column-num="3">
				  <van-grid-item v-for="(item, index) in list" :key="index" :to="item.toURL">
				    <van-image :src="item.img" @click="$navto('/classify/'+item.id)"/>
					<span class="type_goods_title">{{ item.name }}</span>
				  </van-grid-item>
				</van-grid>
			</template>
		</van-tree-select>


	</div>
</template>

<script>
	import {goodsClass} from '../../common/api/web/goods.js'
	export default {
		data() {
			return {
				active: 0,
				nav_items: [],
				list: [],
				search: ''
			};
		}, //data
		mounted() {
			this.initData(0,2)
		},
		methods:{
			// type=1 获取列表
			initData(pid=0,type=1,page=1,pagesize=10){
				let that = this;
				let params = {pid:pid, page:page, pagesize:pagesize};
				goodsClass(params).then(function(res){
					// console.log(res)
					if(type == 2){
						if(res.data.data.length>0){
							// 再次请求获取内容
							let pid = res.data.data[0].id;
							that.initData(pid); //二次请求
						}
						that.nav_items = res.data.data;
					}else{
						that.list = res.data.data;
					}
				})
			},
			onChange(){
				let pid = this.nav_items[this.active]['id'];
				this.initData(pid)
			},
		}
	};
</script>

<style>
	.type_goods_title{
		font-size: 8px;
		color: #959595;
	}
</style>
