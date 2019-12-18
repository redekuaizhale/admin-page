<!--
 vue description

 @author zhanghui
 @date 2019-12-13
 @company Dingxuan
!-->
<template>
  <Modal v-model="modalVisiable" draggable width="800">
    <p slot="header">
      <span>
        {{ title }}
      </span>
    </p>
    <div/>
    <div slot="footer">
      <Button @click="modalVisiable = false">关闭</Button>
      <Button :loading="modalLoading" type="primary" @click="modalSubmitHandle('modalForm')">提交</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'SysUserModal',
  data() {
    return {
      title: '',
      modalLoading: false

    }
  },
  methods: {
    modalSubmitHandle() {

    }
  }
}
</script>

<style scoped>

</style>
