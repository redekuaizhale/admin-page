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
          <FormItem label="是否可用：" prop="status">
            <RadioGroup v-model="modalForm.status">
              <Radio v-for="item in statusList" :key="item.label" :label="item.label"/>
            </RadioGroup>
          </FormItem>
          <FormItem label="所属机构：" prop="company">
            <CompanySelect @commit-compnay-id="companyIdChangeHandle"/>
          </FormItem>
          <FormItem label="所属部门：" prop="deptId">
            <Select v-model="modalForm.deptId" class="select-width-200px">
              <Option v-for="item in deptList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="备注：" prop="remark">
            <Textarea :content="modalForm.remark" @update-textarea="updateTextareaHandle"/>
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
import CompanySelect from '../company-select/company-select'
import Textarea from '../textarea/textarea'
import { findByCompanyIdReq } from '../../api/dept'

export default {
  name: 'SysUserModal',
  components: { Textarea, CompanySelect },
  data() {
    return {
      modalVisiable: false,
      title: '',
      modalLoading: false,
      modalForm: {
        loginCode: '',
        status: '',
        companyId: '',
        deptId: '',
        remark: ''
      },
      modalRule: [],
      statusList: [
        {
          label: '可用'
        },
        {
          label: '禁用'
        }
      ],
      deptList: []
    }
  },
  methods: {
    modalSubmitHandle() {

    },
    modalOpenHandle() {
      this.modalVisiable = true
    },
    companyIdChangeHandle(companyId) {
      this.modalForm.companyId = companyId
    },
    updateTextareaHandle(remark) {
      this.modalForm.remark = remark
    },

    getDeptList() {
      const { companyId } = this.modalForm
      if (!companyId) {
        this.deptList = []
        return
      }
      findByCompanyIdReq({ companyId: this.modalForm.deptId })
    }
  }
}
</script>

<style scoped>

</style>
