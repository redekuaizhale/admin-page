<!--
 vue description

 @author zhanghui
 @date 2019-11-28
 @company Dingxuan
!-->
<template>
  <Card>
    <p slot="title">
      <CommonIcon :type="getPageIcon" :size="getPageIconSize" />
      用户管理
    </p>
    <div>
      <div class="query-form">
        <Form :model="queryForm" :label-width="80" inline>
          <FormItem label="姓名:">
            <Input v-model="queryForm.name" type="text" placeholder="" clearable />
          </FormItem>
          <FormItem label="登录名:">
            <Input v-model="queryForm.loginCode" type="text" placeholder="" clearable />
          </FormItem>
          <Button icon="md-search" type="primary" @click="queryListHandle()">
            查询
          </Button>
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
              <CommonIcon type="_menu1" />
              配置菜单
            </Button>
            <Button type="primary" size="small" @click="roleSetHandle">
              <CommonIcon type="_key" />
              配置角色
            </Button>
          </div>
        </CrudButtonGroup>
        <TableCustom
          ref="TableCustom"
          :columns="tableColumns"
          :data="tableData"
          :loading="tableLoading"
          @check-change="getCheckedRow"
        />
        <PageCustom
          :page-num="pageNum"
          :page-size="pageSize"
          :total="total"
          @on-change="pageNumChangeHandle"
          @on-page-size-change="pageSizeChangeHandle"
        />
      </div>
      <SysUserMenuModal ref="SysUserMenuModal" :checked-id="checkedRow.id" />
      <SysUserModal ref="SysUserModal" @update-user="refreshHandle" />
      <SysUserRoleModal ref="SysUserRoleModal" :user-id="checkedRow.id" />
    </div>
  </Card>
</template>

<script>
import TableCustom from '../../components/table-custom/table-custom'
import PageCustom from '../../components/page-custom/page-custom'
import { userDeleteReq, usersReq } from '../../api/user'
import CrudButtonGroup from '../../components/crud-button-group/crud-button-group'
import SysUserMenuModal from '../../components/sys-user-menu-modal/sys-user-menu-modal'
import SysUserModal from '../../components/sys-user-modal/sys-user-modal'
import SysUserRoleModal from '../../components/sys-user-role/sys-user-role'
import BaseMixins from '../../mixins/base-mixins'
import TableMixins from '../../mixins/table-mixins'
import { newQueryParam, success } from '../../libs/commonUtils'

export default {
  name: 'SysUser',
  components: { SysUserRoleModal, SysUserModal, SysUserMenuModal, CrudButtonGroup, PageCustom, TableCustom },
  mixins: [BaseMixins, TableMixins],
  data() {
    return {
      queryForm: {
        name: '',
        loginCode: ''
      },
      tableColumns: [
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
          key: 'companyName'
        },
        {
          title: '所属部门',
          key: 'deptName'
        }
      ]
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    setQueryRequest() {
      const { name, loginCode } = this.queryForm
      const params = []
      if (name) {
        params.push(newQueryParam('=', 'name', name, this.config.STRING))
      }
      if (loginCode) {
        params.push(newQueryParam('=', 'loginCode', loginCode, this.config.STRING))
      }
      return {
        pageNum: this.pageNum - 1,
        pageSize: this.pageSize,
        queryParamList: params
      }
    },
    queryListHandle() {
      this.getTableData()
    },
    getTableData() {
      this.tableData = []
      this.tableLoading = true
      this.clearCheckedData()
      const requestData = this.setQueryRequest()
      usersReq(requestData).then(res => {
        const { total, resultList } = res.data
        this.total = total
        this.tableData = resultList
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
        success(res.resultMessage)
        this.refreshHandle()
      })
    },
    menuSetHandle() {
      if (this.utils.isChecked(this.checkedRow.id)) {
        this.$refs.SysUserMenuModal.openModal()
      }
    },
    roleSetHandle() {
      this.$refs.SysUserRoleModal.openModal(this.checkedRow.name)
    }
  }
}
</script>

<style scoped>

</style>
