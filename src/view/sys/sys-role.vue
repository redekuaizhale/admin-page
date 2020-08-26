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
          :index="false"
          :columns="tableColumns"
          :data="tableData"
          :loading="tableLoading"
          @check-change="getCheckedRow"
        />
      </div>
      <SysRoleModal ref="SysRoleModal" @update-role="refreshHandle" />
    </div>
  </Card>
</template>

<script>
import TableCustom from '../../components/table-custom/table-custom'
import { roleDeleteReq, rolesReq } from '../../api/role'
import CrudButtonGroup from '../../components/crud-button-group/crud-button-group'
import SysRoleModal from '../../components/sys-role-modal/sys-role-modal'
import BaseMixins from '../../mixins/base-mixins'
import TableMixins from '../../mixins/table-mixins'
import { success } from '../../libs/commonUtils'

export default {
  name: 'SysRole',
  components: { SysRoleModal, CrudButtonGroup, TableCustom },
  mixins: [BaseMixins, TableMixins],
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
  created() {
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
        success(res.resultMessage)
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
