<template>
	<div>
		<!-- 顶部 -->
		<van-nav-bar title="地址管理" left-arrow @click-left="$back()" />

		<!-- 地址列表 -->
		<van-contact-list v-model="chosenContactId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit" add-text="新增地址"
			@select="onSelect" />

	</div>
</template>

<script>
	import {
		addressList
	} from '../../../common/api/web/user.js';
	export default {
		data() {
			return {
				chosenContactId: '1',
				list: [],
			}
		}, //data
		mounted() {
			this.initData();
		},
		methods: {
			// 获取地址列表数据
			async initData() {
				let res = await addressList();
				// console.log(res.data.data)
				let that = this;
				if(res.code == 200){
					this.list = res.data.data
					// 把默认的地址存储到本地
					for(let i=0; i<this.list.length; i++){
						if(that.list[i].isDefault ==true){
							that.$cache_set('default_address',that.list[i])
						}
					}
				}
			},
			onAdd() {
				// this.$router.push('/address_edit')
				this.$router.push({name:'address_edit', params: {id:0}})
			},
			//点击编辑按钮
			onEdit(item, index) {
				// console.log(item,index)
				let params = item;
				this.$cache_set('edit_address', params);
				this.$router.push({name:'address_edit', params: {id:1}})
			},
			onSelect(contact){
				// console.log(contact)
				this.$cache_set('select_address', contact)
				this.$navto('/addorder')
			},
		}
	}
</script>

<style>
</style>
