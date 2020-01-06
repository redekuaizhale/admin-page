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
        <Form ref="modalForm" :model="modalForm" :rules="modalRule" :label-width="90">
          <FormItem label="菜单标题:" prop="title">
            <Input v-model="modalForm.title" placeholder=" " class="input-width-300px"></Input>
          </FormItem>
          <FormItem label="菜单图标:" prop="icon">
            <Input v-model="modalForm.icon" placeholder=" " class="input-width-300px"></Input>
          </FormItem>
          <FormItem label="菜单组件:" prop="name">
            <Input v-model="modalForm.name" placeholder=" " class="input-width-300px"></Input>
          </FormItem>
          <FormItem label="菜单路径:" prop="path">
            <Input v-model="modalForm.path" placeholder=" " class="input-width-300px"></Input>
          </FormItem>
          <FormItem label="绝对路径:" prop="component">
            <Input v-model="modalForm.component" placeholder=" " class="input-width-300px"></Input>
          </FormItem>
          <FormItem label="重定向地址:" prop="redirect">
            <Input v-model="modalForm.redirect" placeholder=" " class="input-width-300px"></Input>
          </FormItem>
          <FormItem label="菜单排序:" prop="menuOrder">
            <InputNumber :max="10000" :min="0" v-model="modalForm.menuOrder" style="width: 300px;"/>
          </FormItem>
          <FormItem label="显示状态" prop="hidden11">
            <iSwitch size="large">
              <span slot="open" true-value="显示">显示</span>
              <span slot="close" false-value="隐藏">隐藏</span>
            </iSwitch>
          </FormItem>
          <FormItem label="使用状态" prop="useFlag">
            <iSwitch size="large">
              <span slot="open" true-value="可用">可用</span>
              <span slot="close" false-value="禁用">禁用</span>
            </iSwitch>
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
import { menuAddReq, menuEditReq } from '../../api/menu'

export default {
  name: 'SysMenuModal',
  data() {
    return {
      addFlag: false,
      title: '',
      modalVisiable: false,
      modalLoading: false,
      modalRule: {
        title: [
          { required: true, message: '菜单标题必填', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '菜单图标必填', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '菜单组件必填', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '菜单路径必填', trigger: 'blur' }
        ],
        component: [
          { required: true, message: '绝对路径必填', trigger: 'blur' }
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
      this.$refs['modalForm'].resetFields()
      this.title = title
      this.addFlag = addFlag
      if (data) {
        this.modalForm = Object.assign({}, data)
      }
      console.info(this.modalForm)

      this.modalVisiable = true
    },
    modalSubmitHandle(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.modalLoading = true
          const requestData = Object.assign({}, this.modalForm)
          if (this.addFlag) {
            menuAddReq(requestData).then(res => {
              console.info('res',)
              this.$emit('updateData')
            }).finally(() => {
              this.modalLoading = false
            })
          } else {
            menuEditReq(requestData).then(res => {
              console.info('res',)
              this.$emit('updateData')
            }).finally(() => {
              this.modalLoading = false
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
