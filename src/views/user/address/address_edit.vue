<template>
	<div>
		<!-- 顶部 -->
		<van-nav-bar :title="title" left-arrow @click-left="$back()" />

		<van-address-edit :address-info="info" :area-list="areaList" :show-delete="isEdit" show-set-default
			:search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave"
			@delete="onDelete" :ref="adress_details" />

	</div>
</template>

<script>
	import {
		areaList
	} from '@vant/area-data';
	import {
		addressSave,
		addressInfo,
		addressDel
	} from '../../../common/api/web/user.js';
	export default {
		data() {
			return {
				title: '新增地址',
				areaList,
				searchResult: [],
				isEdit: false,
				typeOpt: 0, //0表示添加
				adress_details: [],
				info: {}
			}
		}, //data
		mounted() {
			// 获取索要编辑的地址的本地缓存
			// console.log(this.$route.params.id)
			this.typeOpt = this.$route.params.id;
			var localAddress = this.$cache_get('edit_address')
			if (this.typeOpt == 0) {
				this.title = '新增地址';
				this.isEdit = false;
				this.info = {}
			} else {
				this.title = '编辑地址';
				this.typeOpt = true;
				this.isEdit = true;
				this.getDetails(parseInt(localAddress.id))
			}
		},
		methods: {
			// 保存地址
			async onSave(content) {
				if (this.typeOpt == 0) {
					var params = {
						name: content.name,
						tel: parseInt(content.tel),
						area: content.province + '/' + content.city + '/' + content.county,
						addr: content.addressDetail,
						is_default: content.isDefault,
					};
				} else { //带id表示编辑
					var params = {
						id: parseInt(this.$cache_get('edit_address').id),
						name: content.name,
						tel: parseInt(content.tel),
						area: content.province + '/' + content.city + '/' + content.county,
						addr: content.addressDetail,
						is_default: content.isDefault,
					};
					// console.log('编辑')
				}
				let res = await addressSave(params)
				if (res.code == 200) {
					this.$toast(res.msg)
				} else {
					this.$toast(res.msg)
				}
				this.$navto('/address_list');
			},
			// 获取地址详细信息
			async getDetails(id) {
				let params = {
					id: id
				}
				let getinfo = await addressInfo(params);
				if (getinfo.code == 200) {
					this.info = getinfo.data;
				} else {
					this.$toast('获取详细信息失败')
				}
			},
			// 删除地址
			async onDelete() {
				let params = {
					id: this.info.id
				}
				let res = await addressDel(params);
				if (res.code == 200) {
					this.$toast(res.msg)
					this.$navto('/address_list')
					this.$cache_set('edit_address','')
				} else {
					this.$toast(res.msg)
				}
			},
		}
	}
</script>

<style>
</style>
