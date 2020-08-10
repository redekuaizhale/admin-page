<!--
 vue description

 @author zhanghui
 @date 2019-11-28
 @company Dingxuan
!-->
<template>
  <Card>
    <p slot="title">
      <CommonIcon type="_menu-role" />
      角色管理
    </p>
    <div>
      <div class="query-result">
        <CrudButtonGroup
          ref="CrudButtonGroup"
          :checked-id="checkedRow.id"
          @edit="editHandle"
          @add="addHandle"
          @delete="deleteHandle"
          @refresh="refreshHandle"
        />
        <TableCustom
          ref="TableCustom"
          :columns="tableColumns"
          :data="tableData"
          :check="true"
          :loading="tableLoading"
          @check-change="getCheckedRow"
        />
      </div>
      <SysRoleModal ref="SysRoleModal" @update-role="refreshHandle"/>
    </div>
  </Card>
</template>

<script>
import TableCustom from '../../components/table-custom/table-custom'
import PageCustom from '../../components/page-custom/page-custom'
import BaseTableData from '../../components/base-table-data/base-table-data'
import { roleDeleteReq, rolesReq } from '../../api/role'
import CrudButtonGroup from '../../components/crud-button-group/crud-button-group'
import SysRoleModal from '../../components/sys-role-modal/sys-role-modal'

export default {
  name: 'SysRole',
  components: { SysRoleModal, CrudButtonGroup, BaseTableData, PageCustom, TableCustom },
  extends: BaseTableData,
  data() {
    return {
      tableColumns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '名称',
          key: 'name',
          width: 300
        },
        {
          title: '描述',
          key: 'remark'
        }
      ]
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    refreshHandle() {
      this.getTableData()
    },
    addHandle() {
      this.$refs.SysRoleModal.openModal('新增', true, null)
    },
    editHandle() {
      this.$refs.SysRoleModal.openModal('修改', false, this.checkedRow)
    },
    deleteHandle() {
      roleDeleteReq({ id: this.checkedRow.id }).then(res => {
        this.utils.success(res.resultMessage)
        this.refreshHandle()
      })
    },
    queryListHandle() {
      this.getTableData()
    },
    getTableData() {
      this.tableData = []
      this.tableLoading = true
      this.clearCheckedData()
      const requestData = {}
      rolesReq(requestData).then(res => {
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
    }
  }
}
</script>

<style scoped>

</style>
