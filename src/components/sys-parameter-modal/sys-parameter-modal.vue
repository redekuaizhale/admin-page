<!--
 vue description

 @author zhanghui
 @date 2019-12-23
 @company Dingxuan
!-->
<template>
  <div>
    <Modal v-model="modalVisiable" :styles="{top: '10px'}" draggable>
      <p slot="header">
        <span>
          参数-{{ title }}
        </span>
      </p>
      <div>
        <Form ref="modalForm" :model="modalForm" :rules="modalRule" :label-width="90">
          <FormItem label="参数key:" prop="parameterKey">
            <Input v-model="modalForm.parameterKey" placeholder=" " class="input-width-300px"></Input>
          </FormItem>
          <FormItem label="参数1:" prop="value">
            <Textarea v-model="modalForm.value" class="textarea-300px"/>
          </FormItem>
          <FormItem label="参数2:" prop="value2">
            <Textarea v-model="modalForm.value2" class="textarea-300px"/>
          </FormItem>
          <FormItem label="参数3:" prop="value3">
            <Textarea v-model="modalForm.value3" class="textarea-300px"/>
          </FormItem>
          <FormItem label="参数4:" prop="value4">
            <Textarea v-model="modalForm.value4" class="textarea-300px"/>
          </FormItem>
          <FormItem label="参数5:" prop="value5">
            <Textarea v-model="modalForm.value5" class="textarea-300px"/>
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
import { parameterAddReq, parameterEditReq } from '../../api/parameter'
import ModalFooter from '../modal-footer/modal-footer'
import { success } from '../../libs/commonUtils'

export default {
  name: 'SysParameterModal',
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
        parameterKey: [
          { required: true, message: '参数key必填', trigger: 'blur' }
        ]
      },
      modalForm: {
        parameterKey: '',
        value: '',
        value2: '',
        value3: '',
        value4: '',
        value5: ''
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
            parameterAddReq(requestData).then(res => {
              this.submitSuccessHandle(res)
            })
          } else {
            parameterEditReq(requestData).then(res => {
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
      this.$emit('update-parameter')
    }
  }
}
</script>

<style scoped>

</style>
