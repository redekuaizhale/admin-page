<!--
 vue description

 @author zhanghui
 @date 2019-12-23
 @company Dingxuan
!-->
<template>
  <div>
    <Modal v-model="modalVisiable" draggable width="500">
      <p slot="header">
        <span>
          {{ title }}-角色信息
        </span>
      </p>
      <div class="sys-user-role">
        <CheckboxGroup v-model="roleIdList">
          <Checkbox v-for="item in roleList" :label="item.id" :key="item.id">{{ item.name }}</Checkbox>
        </CheckboxGroup>
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
import { roleAddReq, rolesReq } from '../../api/role'
import { userRolesReq } from '../../api/userRole'
import ModalFooter from '../modal-footer/modal-footer'
import Textarea from '../textarea/textarea'

export default {
  name: 'SysUserRoleModal',
  components: { Textarea, ModalFooter },
  props: {
    userId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      title: '',
      modalVisiable: false,
      submitLoading: false,
      roleList: [],
      roleIdList: []
    }
  },
  methods: {
    openModal(title, addFlag, data) {
      this.title = title
      this.modalVisiable = true
      this.getRoleList()
      this.getHasRuleList()
    },
    modalSubmitHandle() {
      const requestData = {}
    },
    submitSuccessHandle(res) {
      this.modalVisiable = false
      this.utils.success(res.resultMessage)
    },
    getRoleList() {
      rolesReq({}).then(res => {
        if (res.data.resultList) {
          this.roleList = res.data.resultList
        }
      })
    },
    getHasRuleList() {
      this.roleIdList = []
      const requestData = {
        queryParamList: [this.utils.newQueryParam('=', 'userEntity.id', this.userId, this.config.String)]
      }
      userRolesReq(requestData).then(res => {
        const list = res.data.resultList
        if (list && list.length > 0) {
          list.map(item => {
            this.roleIdList.push(item.id)
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.sys-user-role{
  .ivu-checkbox-wrapper{
    display: block;
  }
}
</style>
