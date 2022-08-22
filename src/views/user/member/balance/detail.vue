<template>
	<div class="gray-bg">
		<van-nav-bar title="余额明细" left-arrow @click-left="onClickLeft" class="nav"/>

		<van-cell style="margin-top: 46px;">
			<template #title>
				<van-row>
					<span style="margin-right: 10px;">类型筛选</span>
					<span @click="showType = true">{{value}}
						<van-icon name="arrow-down" style="margin-left: 4px;" />
					</span>
				</van-row>
			</template>
		</van-cell>

		<!-- 选择类别弹出层 -->
		<van-popup v-model="showType" round position="bottom" style="height: 320px; ">
			<van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="onCancel" style="position: absolute;bottom: 0;width: 100%;" />
		</van-popup>
		
		<van-cell v-for="(item, index) in details" :key='index' :title="item.type" style="margin-top: 10px;padding-bottom: 0;">
			<template>
				<van-row style="font-size: 12px;">{{item.changeTime}}</van-row>
				<van-row style="font-size: 25px; color: rgb(255,113,94);line-height: 36px;margin-top: 6px;">{{item.amount}}</van-row>
			</template>
			<template #label>
				<span style="line-height: 30px;">余额：{{item.remainder}}</span>
			</template>
		</van-cell>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				showType: false,
				columns: ['全部', '消费', '退款', '充值', '提现', '佣金', '平台调整'],
				value: '全部',
				details:[
					{
						typeId: 1,
						type: '消费',
						changeTime: '2021-08-31 15:50:46',
						remainder: '983.21',
						amount: '-361.22'
					},{
						typeId: 2,
						type: '退款',
						changeTime: '2021-08-31 15:50:46',
						remainder: '983.21',
						amount: '-361.22'
					},{
						typeId: 3,
						type: '充值',
						changeTime: '2021-08-31 15:50:46',
						remainder: '983.21',
						amount: '-361.22'
					},{
						typeId: 4,
						type: '提现',
						changeTime: '2021-08-31 15:50:46',
						remainder: '983.21',
						amount: '-361.22'
					},{
						typeId: 5,
						type: '佣金',
						changeTime: '2021-08-31 15:50:46',
						remainder: '983.21',
						amount: '-361.22'
					},{
						typeId: 6,
						type: '平台调整',
						changeTime: '2021-08-31 15:50:46',
						remainder: '983.21',
						amount: '361.22'
					},{
						typeId: 1,
						type: '消费',
						changeTime: '2021-08-31 15:50:46',
						remainder: '983.21',
						amount: '-361.22'
					},{
						typeId: 2,
						type: '退款',
						changeTime: '2021-08-31 15:50:46',
						remainder: '983.21',
						amount: '-361.22'
					},{
						typeId: 3,
						type: '充值',
						changeTime: '2021-08-31 15:50:46',
						remainder: '983.21',
						amount: '-361.22'
					},{
						typeId: 4,
						type: '提现',
						changeTime: '2021-08-31 15:50:46',
						remainder: '983.21',
						amount: '-361.22'
					},{
						typeId: 5,
						type: '佣金',
						changeTime: '2021-08-31 15:50:46',
						remainder: '983.21',
						amount: '-361.22'
					},{
						typeId: 6,
						type: '平台调整',
						changeTime: '2021-08-31 15:50:46',
						remainder: '983.21',
						amount: '361.22'
					},
				]
			}
		}, //data
		methods: {
			onClickLeft() {
				this.$router.go('-1')
			},
			onConfirm(value, index) {
				// Toast(`当前值：${value}, 当前索引：${index}`);
				console.log(value, index)
				this.showType = false
				this.value = value
			},
			onCancel() {
				// Toast('取消');
				this.showType = false
			},
		}
	}
</script>

<style>
	.nav {
		position: fixed;
		width: 100%;
		/* height: 100%; */
		z-index: 1111;
	}
</style>
