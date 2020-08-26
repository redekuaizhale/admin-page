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
          <Checkbox v-for="item in roleList" :key="item.id" :label="item.id">
            {{ item.name }}
          </Checkbox>
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
import { rolesReq } from '../../api/role'
import { addUserRoleReq, findHasRoleIdsReq } from '../../api/userRole'
import ModalFooter from '../modal-footer/modal-footer'
import { success } from '../../libs/commonUtils'

export default {
  name: 'SysUserRoleModal',
  components: { ModalFooter },
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
      this.modalLoading = true
      const requestData = {
        userId: this.userId,
        roleIdList: this.roleIdList
      }
      addUserRoleReq(requestData).then(res => {
        this.modalVisiable = false
        this.modalLoading = false
        this.$Message.success(res.resultMessage)
      })
    },
    submitSuccessHandle(res) {
      this.modalVisiable = false
      success(res.resultMessage)
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
      findHasRoleIdsReq({ userId: this.userId }).then(res => {
        this.roleIdList = res.data
      })
    }
  }
}
</script>

<style lang="less">
.sys-user-role{
  .ivu-checkbox-wrapper{
    display: block;
    padding-left: 20px;
  }
}
</style>
