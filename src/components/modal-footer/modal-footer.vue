<!--
 vue description

 @author zhanghui
 @date 2020-05-19
 @company Dingxuan
!-->
<template>
  <div>
    <Button @click="modalCancelHandle">关闭</Button>
    <Button v-if="!readOnly" :loading="submitLoading" type="primary" @click="modalSubmitHandle()">提交</Button>
  </div>
</template>

<script>
export default {
  name: 'ModalFooter',
  props: {
    submitLoading: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    modalCancelHandle() {
      this.$emit('cancel')
    },
    modalSubmitHandle() {
      this.$emit('submit')
    }
  }
}
</script>

<style scoped>

</style>
