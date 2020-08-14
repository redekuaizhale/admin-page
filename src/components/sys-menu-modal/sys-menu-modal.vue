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
          菜单-{{ title }}
        </span>
      </p>
      <div>
        <Form ref="modalForm" :model="modalForm" :rules="modalRule" :label-width="100">
          <FormItem label="菜单标题:" prop="title">
            <Input v-model="modalForm.title" placeholder=" " class="input-width-300px"></Input>
          </FormItem>
          <FormItem label="菜单图标:" prop="icon">
            <Input v-model="modalForm.icon" placeholder=" " class="input-width-300px"></Input>
          </FormItem>
          <FormItem label="菜单名称:" prop="name">
            <Input v-model="modalForm.name" placeholder=" " class="input-width-300px"></Input>
          </FormItem>
          <FormItem label="菜单路径:" prop="path">
            <Input v-model="modalForm.path" placeholder=" " class="input-width-300px"></Input>
          </FormItem>
          <FormItem label="组件:" prop="component">
            <Input v-model="modalForm.component" placeholder=" " class="input-width-300px"></Input>
          </FormItem>
          <FormItem label="重定向地址:" prop="redirect">
            <Input v-model="modalForm.redirect" placeholder=" " class="input-width-300px"></Input>
          </FormItem>
          <FormItem label="菜单排序:" prop="menuOrder">
            <InputNumber :max="10000" :min="0" v-model="modalForm.menuOrder" style="width: 300px;"/>
          </FormItem>
          <FormItem label="显示状态:" prop="hidden">
            <iSwitch :value="modalForm.hidden === '显示'" size="large" @on-change="hiddenChangeHandle">
              <span slot="open" true-value="显示">显示</span>
              <span slot="close" false-value="隐藏">隐藏</span>
            </iSwitch>
          </FormItem>
          <FormItem label="可用状态:" prop="useFlag">
            <iSwitch :value="modalForm.useFlag === '可用'" size="large" @on-change="useFlagChangeHandle">
              <span slot="open" true-value="可用">可用</span>
              <span slot="close" false-value="禁用">禁用</span>
            </iSwitch>
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
import { menuAddReq, menuEditReq } from '../../api/menu'
import ModalFooter from '../modal-footer/modal-footer'

export default {
  name: 'SysMenuModal',
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
        title: [
          { required: true, message: '菜单标题必填', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '菜单图标必填', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '菜单名称必填', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '菜单路径必填', trigger: 'blur' }
        ],
        component: [
          { required: true, message: '组件必填', trigger: 'blur' }
        ]
      },
      modalForm: {
        title: '',
        icon: '',
        name: '',
        path: '',
        component: '',
        redirect: '',
        menuOrder: 0,
        hidden: '显示',
        useFlag: '可用'
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
          requestData.parentId = this.parentId
          if (this.addFlag) {
            menuAddReq(requestData).then(res => {
              this.submitSuccessHandle(res)
            }).finally(() => {
              this.submitLoading = false
            })
          } else {
            menuEditReq(requestData).then(res => {
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
      this.$emit('update-memu')
    },
    useFlagChangeHandle(flag) {
      this.modalForm.useFlag = flag ? '可用' : '禁用'
    },
    hiddenChangeHandle(flag) {
      this.modalForm.hidden = flag ? '显示' : '隐藏'
    }
  }
}
</script>

<style scoped>

</style>
