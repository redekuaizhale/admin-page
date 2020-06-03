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
          <FormItem label="部门名称:" prop="name">
            <Input v-model="modalForm.name" placeholder=" " class="input-width-300px"></Input>
          </FormItem>
          <FormItem label="部门排序:" prop="deptOrder">
            <InputNumber :max="10000" :min="0" v-model="modalForm.deptOrder" style="width: 300px;"/>
          </FormItem>
          <FormItem label="部门描述:" prop="remark">
            <Textarea :content="modalForm.remark" :width="300" @update-textarea="updateTextareaHandle"/>
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
import { deptAddReq, deptEditReq } from '../../api/dept'
import ModalFooter from '../modal-footer/modal-footer'
import Textarea from '../textarea/textarea'

export default {
  name: 'SysDeptModal',
  components: { Textarea, ModalFooter },
  props: {
    companyId: {
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
          { required: true, message: '部门名称必填', trigger: 'blur' }
        ]
      },
      modalForm: {
        name: '',
        deptOrder: 0,
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
          requestData.companyId = this.companyId
          if (this.addFlag) {
            deptAddReq(requestData).then(res => {
              this.submitSuccessHandle(res)
            }).finally(() => {
              this.submitLoading = false
            })
          } else {
            deptEditReq(requestData).then(res => {
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
      this.utils.success(res.resultMessage)
      this.$emit('update-dept')
    },
    updateTextareaHandle(value) {
      this.modalForm.remark = value
    }
  }
}
</script>

<style scoped>

</style>
