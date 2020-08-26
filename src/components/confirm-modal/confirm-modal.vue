<!--
 vue description

 @author zhanghui
 @date 2019-03-28
 @company Dingxuan
!-->
<template>
  <div>
    <Modal
      v-model="confirmModalVisiable"
      :z-index="9999"
      class="confirm-modal"
      width="400"
    >
      <div class="head">
        <CommonIcon :size="18" type="_question-circle" color="#faad14" />
        {{ title }}
      </div>
      <div class="body">
        {{ desc }}
      </div>
      <div slot="footer">
        <Button @click="confirmModalVisiable = false">
          取消
        </Button>
        <Button type="primary" @click="confirmHandle">
          确定
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    title: {
      type: String,
      default: '确认删除?'
    },
    desc: {
      type: String,
      default: '删除后该数据不能找回'
    }
  },
  data() {
    return {
      confirmModalVisiable: false
    }
  },
  methods: {
    confirmHandle() {
      this.$emit('on-confirm-handle')
      this.confirmModalVisiable = false
    },
    openConfirmModalHandle() {
      this.confirmModalVisiable = true
    }
  }
}
</script>

<style lang="less">
  .confirm-modal{
    .head{
      display: block;
      color: rgba(0,0,0,0.85);
      font-weight: 500;
      font-size: 16px;
      line-height: 1.4;
    }
    .body{
      color: rgba(0,0,0,0.65);
      font-size: 14px;
      margin-top: 10px;
      margin-left: 22px;
    }
  }
</style>
