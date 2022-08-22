<template>
	<div>
		<van-nav-bar title="我的银行卡" left-arrow @click-left="onClickLeft" />
	
<van-contact-list
  v-model="chosenContactId"
  :list="list"
  default-tag-text="默认"
  add-text="添加银行卡"
  @add="onAdd"
  @edit="onEdit"
  @select="onSelect"
/>

</div>
</template>

<script>

export default {
  data() {
    return {
      chosenContactId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          isDefault: true,
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
        },
      ],
    };
  },
  methods: {
    onAdd() {
      this.$router.push('bankcard_edit')
    },
    onEdit(contact) {
      this.$toast('编辑' + contact.id);
    },
    onSelect(contact) {
      this.$toast('选择' + contact.id);
    },
	onClickLeft(){
		this.$router.go('-1')
	}
  },
};

</script>