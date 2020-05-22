<!--
 vue description

 @author zhanghui
 @date 2019-12-19
 @company Dingxuan
!-->
<template>
  <div class="curd-button-group">
    <Button v-if="refreshVisiable" type="primary" size="small" @click="refreshHandle">
      <CommonIcon type="_refresh"/>
      刷新
    </Button>
    <Button v-if="addVisiable" type="primary" size="small" @click="addHandle">
      <CommonIcon type="_add"/>
      新增
    </Button>
    <Button v-if="editVisiable" type="primary" size="small" @click="editHandle">
      <CommonIcon type="_edit"/>
      修改
    </Button>
    <Button v-if="deleteVisiable" type="primary" size="small" @click="deleteHandle">
      <CommonIcon type="_delete"/>
      删除
    </Button>
    <ConfirmModal ref="confirmModal" @on-confirm-handle="confirmDeleteHandle"/>
  </div>
</template>

<script>
import CommonIcon from '../common-icon/common-icon'
import ConfirmModal from '../confirm-modal/confirm-modal'
export default {
  name: 'CrudButtonGroup',
  components: { ConfirmModal, CommonIcon },
  props: {
    refreshVisiable: {
      type: Boolean,
      default: true
    },
    addVisiable: {
      type: Boolean,
      default: true
    },
    editVisiable: {
      type: Boolean,
      default: true
    },
    deleteVisiable: {
      type: Boolean,
      default: true
    },
    checkedId: {
      type: String,
      default: ''
    }
  },
  methods: {
    refreshHandle() {
      this.$emit('refresh')
    },
    addHandle() {
      this.$emit('add')
    },
    deleteHandle() {
      if (!this.validateCheckId()) {
        return
      }
      this.$refs.confirmModal.openConfirmModalHandle()
    },
    editHandle() {
      if (!this.validateCheckId()) {
        return
      }
      this.$emit('edit')
    },
    validateCheckId() {
      if (!this.checkedId) {
        this.utils.uncheckedError()
      }
      return !!this.checkedId
    },
    confirmDeleteHandle() {
      this.$emit('delete')
    }
  }
}
</script>

<style scoped lang="less">
  .curd-button-group{
    margin-bottom: 5px;
    .ivu-btn{
      margin-right: 5px;
    }
  }
</style>
