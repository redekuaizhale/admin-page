<!--
 vue description

 @author zhanghui
 @date 2019-12-13
 @company Dingxuan
!-->
<template>
  <div>
    <Modal v-model="modalVisiable" draggable width="500">
      <p slot="header">
        <span>
          {{ title }}
        </span>
      </p>
      <div>
        <Form ref="modalForm" :model="modalForm" :rules="modalRule" :label-width="100">
          <FormItem label="登录账号:" prop="loginCode">
            <Input v-model="modalForm.loginCode" placeholder=" " class="input-width-350px"></Input>
          </FormItem>
          <FormItem label="是否可用:" prop="status">
            <RadioGroup v-model="modalForm.status">
              <Radio v-for="item in statusList" :key="item.label" :label="item.label"/>
            </RadioGroup>
          </FormItem>
          <FormItem label="所属机构:">
            <CompanySelect :id="modalForm.companyId" @commit-compnay-id="companyIdChangeHandle"/>
          </FormItem>
          <FormItem label="所属部门:" prop="deptId">
            <Select v-model="modalForm.deptId" class="select-width-350px">
              <Option v-for="item in deptList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="备注:" prop="remark">
            <Textarea v-model="modalForm.remark" class="textarea-350px"/>
          </FormItem>
        </Form>
      </div>
      <ModalFooter
        slot="footer"
        :submit-loading="submitLoading"
        @cancel="modalVisiable = false"
        @submit="modalSubmitHandle('modalForm')"
      />
    </Modal>
  </div>
</template>

<script>
import CompanySelect from '../company-select/company-select'
import { findByCompanyIdReq } from '../../api/dept'
import { userAddReq, userEditReq } from '../../api/user'
import ModalFooter from '../modal-footer/modal-footer'
import { success } from '../../libs/commonUtils'

export default {
  name: 'SysUserModal',
  components: { ModalFooter, CompanySelect },
  data() {
    const validateCompany = (rule, value, callback) => {
      if (!this.companyId) {
        callback(new Error('所属机构不能为空！'))
      } else {
        callback()
      }
    }
    const validateDept = (rule, value, callback) => {
      if (!value) {
        callback(new Error('所属部门不能为空！'))
      } else {
        callback()
      }
    }
    return {
      modalVisiable: false,
      title: '',
      submitLoading: false,
      modalForm: {
        loginCode: '',
        password: '',
        companyId: '',
        deptId: '',
        remark: ''
      },
      modalRule: {
        loginCode: [
          { required: true, message: '登录账号不能为空！', trigger: 'blur' }
        ],
        companyId: [
          { required: true, validator: validateCompany, trigger: 'change' }
        ],
        deptId: [
          { required: true, validator: validateDept, trigger: 'change' }
        ]
      },
      statusList: [
        {
          label: '可用'
        },
        {
          label: '禁用'
        }
      ],
      deptList: [],
      comanyId: ''
    }
  },
  methods: {
    openModal(title, addFlag, data) {
      this.title = title
      this.addFlag = addFlag
      this.modalVisiable = true
      this.modalForm = Object.assign({}, data)
      if (addFlag) {
        this.modalForm.status = this.config.STATUS.IN_USE
        this.$refs['modalForm'].resetFields()
      } else {
        this.modalForm.companyId = data.companyId
        this.modalForm.deptId = data.deptId
      }
    },

    modalSubmitHandle() {
      this.$refs['modalForm'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          const requestData = Object.assign({}, this.modalForm)
          requestData.password = this.config.DEFAULT_USER_PASS
          if (this.addFlag) {
            userAddReq(requestData).then(res => {
              this.submitSuccessHandle(res)
            }).finally(() => {
              this.submitLoading = false
            })
          } else {
            userEditReq(requestData).then(res => {
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
      this.$emit('update-user')
    },
    companyIdChangeHandle(companyId) {
      this.modalForm.companyId = companyId
      this.comanyId = companyId
      this.getDeptList()
    },
    getDeptList() {
      this.modalForm.deptId = ''
      this.deptList = []
      const { companyId } = this.modalForm
      if (!companyId) {
        return
      }
      findByCompanyIdReq({ companyId: this.modalForm.companyId }).then(res => {
        if (res.data) {
          res.data.map(item => {
            this.deptList.push({
              value: item.id,
              label: item.name
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
