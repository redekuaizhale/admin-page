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
          <FormItem label="部门排序:" prop="deptOrder">
            <InputNumber :max="10000" :min="0" v-model="modalForm.deptOrder" class="number-input-300px"/>
          </FormItem>
          <FormItem label="部门名称:" prop="name">
            <Input v-model="modalForm.name" placeholder=" " class="input-width-300px"></Input>
          </FormItem>
          <FormItem label="成立时间:" prop="setupDate">
            <DateCustom v-model="modalForm.setupDate" class="input-width-300px"/>
          </FormItem>
          <FormItem label="部门描述:" prop="remark">
            <Textarea v-model="modalForm.remark" class="textarea-300px"/>
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
import { success } from '../../libs/commonUtils'

export default {
  name: 'SysDeptModal',
  components: { ModalFooter },
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
        setupDate: '',
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
            })
          } else {
            deptEditReq(requestData).then(res => {
              this.submitSuccessHandle(res)
            })
          }
        }
      })
    },
    submitSuccessHandle(res) {
      this.submitLoading = false
      this.modalVisiable = false
      success(res.resultMessage)
      this.$emit('update-dept')
    }
  }
}
</script>

<style scoped>

</style>
