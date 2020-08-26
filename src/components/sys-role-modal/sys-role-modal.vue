<!--
 vue description

 @author zhanghui
 @date 2019-12-23
 @company Dingxuan
!-->
<template>
  <div>
    <Modal v-model="modalVisiable" :styles="{top: '10px'}" draggable width="500">
      <p slot="header">
        <span>
          部门-{{ title }}
        </span>
      </p>
      <div>
        <Form ref="modalForm" :model="modalForm" :rules="modalRule" :label-width="90">
          <FormItem label="角色名称:" prop="name">
            <Input v-model="modalForm.name" placeholder=" " class="input-width-300px" /></Input>
          </FormItem>
          <FormItem label="角色描述:" prop="remark">
            <Textarea v-model="modalForm.remark" class="textarea-300px" />
          </FormItem>
        </Form>
      </div>
      <ModalFooter
        slot="footer"
        :submit-loading="submitLoading"
        @cancel="modalVisiable = false"
        @submit="modalSubmitHandle"
      />
    </Modal>
  </div>
</template>

<script>
import { roleAddReq, roleEditReq } from '../../api/role'
import ModalFooter from '../modal-footer/modal-footer'
import { success } from '../../libs/commonUtils'

export default {
  name: 'SysRoleModal',
  components: { ModalFooter },
  props: {
    parentId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      addFlag: false,
      title: '',
      modalVisiable: false,
      submitLoading: false,
      modalRule: {
        name: [
          { required: true, message: '角色名称必填', trigger: 'blur' }
        ]
      },
      modalForm: {
        name: '',
        remark: ''
      }
    }
  },
  methods: {
    openModal(title, addFlag, data) {
      this.title = title
      this.addFlag = addFlag
      if (data) {
        this.modalForm = Object.assign({}, data)
      } else {
        this.$refs['modalForm'].resetFields()
      }
      this.modalVisiable = true
    },
    modalSubmitHandle() {
      this.$refs['modalForm'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          const requestData = Object.assign({}, this.modalForm)
          if (this.addFlag) {
            roleAddReq(requestData).then(res => {
              this.submitSuccessHandle(res)
            }).finally(() => {
              this.submitLoading = false
            })
          } else {
            roleEditReq(requestData).then(res => {
              this.submitSuccessHandle(res)
            }).finally(() => {
              this.submitLoading = false
            })
          }
        }
      })
    },
    submitSuccessHandle(res) {
      this.modalVisiable = false
      success(res.resultMessage)
      this.$emit('update-role')
    }
  }
}
</script>

<style scoped>

</style>
