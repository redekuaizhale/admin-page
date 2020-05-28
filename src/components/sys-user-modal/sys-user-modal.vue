<!--
 vue description

 @author zhanghui
 @date 2019-12-13
 @company Dingxuan
!-->
<template>
  <div>
    <Modal v-model="modalVisiable" draggable width="800">
      <p slot="header">
        <span>
          {{ title }}
        </span>
      </p>
      <div>
        <Form ref="modalForm" :model="modalForm" :rules="modalRule" :label-width="80">
          <FormItem label="登录账号：" prop="loginCode">
            <Input v-model="modalForm.loginCode" placeholder=" " class="input-width-200px"></Input>
          </FormItem>
          <FormItem label="默认密码：" prop="password">
            <Input v-model="modalForm.password" placeholder=" " class="input-width-200px"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="modalVisiable = false">关闭</Button>
        <Button :loading="modalLoading" type="primary" @click="modalSubmitHandle('modalForm')">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'SysUserModal',
  data() {
    return {
      modalVisiable: false,
      title: '',
      modalLoading: false,
      modalForm: {},
      modalRule: []
    }
  },
  methods: {
    modalSubmitHandle() {

    },
    modalOpenHandle() {
      this.modalVisiable = true
    }
  }
}
</script>

<style scoped>

</style>
