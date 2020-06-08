<!--
 vue description

 @author zhanghui
 @date 2019-11-28
 @company Dingxuan
!-->
<template>
  <Card>
    <p slot="title">
      <CommonIcon type="_menu-user" />
      用户管理
    </p>
    <div>
      <div class="query-form">
        <Form :model="queryForm" :label-width="80" inline>
          <FormItem label="姓名：">
            <Input v-model="queryForm.name" type="text" placeholder=""> </Input>
          </FormItem>
          <FormItem label="登录名：">
            <Input v-model="queryForm.loginCode" type="text" placeholder="">
            </Input>
          </FormItem>
          <FormItem>
            <Button icon="md-search" type="primary" @click="queryListHandle()">查询</Button>
          </FormItem>
        </Form>
      </div>
      <div class="query-result">
        <CrudButtonGroup
          ref="CrudButtonGroup"
          :checked-id="checkedRow.id"
          @edit="editHandle"
          @add="addHandle"
          @delete="deleteHandle"
          @refresh="refreshHandle"
        >
          <div slot="extra" class="extra">
            <Button type="primary" size="small" @click="menuSetHandle">
              <CommonIcon type="_menu"/>
              配置菜单
            </Button>
            <Button type="primary" size="small">
              <CommonIcon type="_menu-role"/>
              配置角色
            </Button>
          </div>
        </CrudButtonGroup>
        <TableCustom
          ref="TableCustom"
          :columns="tableColumns"
          :data="tableData"
          :check="true"
          :loading="tableLoading"
          @check-change="getCheckedRow"
        />
        <PageCustom/>
      </div>
      <SysUserMenuModal ref="SysUserMenuModal" :checked-id="checkedRow.id"/>
      <SysUserModal ref="SysUserModal" @update-user="refreshHandle"/>
    </div>
  </Card>
</template>

<script>
import CommonIcon from '../../components/common-icon/common-icon'
import TableCustom from '../../components/table-custom/table-custom'
import PageCustom from '../../components/page-custom/page-custom'
import BaseData from '../../components/base-data/base-data'
import { userDeleteReq, usersReq } from '../../api/user'
import CrudButtonGroup from '../../components/crud-button-group/crud-button-group'
import SysUserMenuModal from '../../components/sys-user-menu-modal/sys-user-menu-modal'
import SysUserModal from '../../components/sys-user-modal/sys-user-modal'

export default {
  name: 'SysUser',
  components: { SysUserModal, SysUserMenuModal, CrudButtonGroup, BaseData, PageCustom, TableCustom, CommonIcon },
  extends: BaseData,
  data() {
    return {
      queryForm: {
        name: '',
        loginCode: ''
      },
      tableColumns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '登录名',
          key: 'loginCode'
        },
        {
          title: '账号状态',
          key: 'status'
        },
        {
          title: '手机号',
          key: 'phone'
        },
        {
          title: '所属机构',
          key: 'companyEntity.name',
          render: (h, params) => {
            return h('div', params.row.deptEntity.companyEntity.name)
          }
        },
        {
          title: '所属部门',
          key: 'deptEntity.name',
          render: (h, params) => {
            return h('div', params.row.deptEntity.name)
          }
        }
      ]
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    setQueryParam() {
      const { name, loginCode } = this.queryForm
      const params = []
      if (name) {
        params.push(this.utils.newQueryParam('=', 'name', name, this.config.String))
      }
      if (loginCode) {
        params.push(this.utils.newQueryParam('=', 'loginCode', loginCode, this.config.String))
      }
      return params
    },
    queryListHandle() {
      this.getTableData()
    },
    getTableData() {
      this.tableData = []
      this.tableLoading = true
      this.clearCheckedData()
      const requestData = {
        queryParamList: this.setQueryParam()
      }
      usersReq(requestData).then(res => {
        if (res.data.resultList) {
          this.tableData = res.data.resultList
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    addListHandle() {

    },
    getCheckedRow(row) {
      this.checkedRow = row
    },
    refreshHandle() {
      this.getTableData()
    },
    addHandle() {
      this.$refs.SysUserModal.openModal('新增', true, {})
    },
    editHandle() {
      this.$refs.SysUserModal.openModal('修改', false, this.checkedRow)
    },
    deleteHandle() {
      userDeleteReq({ id: this.checkedRow.id }).then(res => {
        this.utils.success(res.resultMessage)
        this.refreshHandle()
      })
    },
    menuSetHandle() {
      if (this.utils.isChecked(this.checkedRow.id)) {
        this.$refs.SysUserMenuModal.openModal()
      }
    }
  }
}
</script>

<style scoped>

</style>
