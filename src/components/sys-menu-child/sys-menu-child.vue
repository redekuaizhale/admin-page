<!--
 vue description

 @author zhanghui
 @date 2019-12-18
 @company Dingxuan
!-->
<template>
  <Card>
    <p slot="title">
      二级菜单
    </p>
    <div>
      <CrudButtonGroup
        ref="CrudButtonGroup"
        :checked-id="checkedRow.id"
        @add="addHandle"
        @delete="deleteHandle"
        @edit="editHandle"
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
      <SysMenuModal ref="SysMenuModal" :parent-id="childParentId" @update-memu="refreshHandle" />
    </div>
  </Card>
</template>

<script>
import { menusReq, menuDeleteReq } from '../../api/menu'
import CrudButtonGroup from '../crud-button-group/crud-button-group'
import SysMenuModal from '../sys-menu-modal/sys-menu-modal'
import TableCustom from '../table-custom/table-custom'
import BaseMixins from '../../mixins/base-mixins'
import TableMixins from '../../mixins/table-mixins'
import { newQueryParam, success } from '../../libs/commonUtils'

export default {
  name: 'SysMenuChild',
  components: { TableCustom, SysMenuModal, CrudButtonGroup },
  mixins: [BaseMixins, TableMixins],
  data() {
    return {
      tableColumns: [
        {
          title: '排序',
          key: 'menuOrder',
          width: 70
        },
        {
          title: '菜单标题',
          key: 'title'
        },
        {
          title: '可用状态',
          key: 'useFlag'
        },
        {
          title: '图标',
          key: 'icon',
          render: (h, params) => {
            return h('CommonIcon', {
              props: {
                type: params.row.icon,
                size: 14
              }
            })
          }
        },
        {
          title: '菜单名称',
          key: 'name'
        },
        {
          title: '菜单路径',
          key: 'path'
        },
        {
          title: '组件',
          key: 'component'
        }
      ],
      childParentId: ''
    }
  },
  methods: {
    refreshHandle() {
      this.getTableData(this.childParentId)
    },
    addHandle() {
      if (!this.childParentId) {
        this.utils.warning('未勾选一级菜单！')
        return
      }
      this.$refs.SysMenuModal.openModal('新增', true, null)
    },
    deleteHandle() {
      menuDeleteReq({ id: this.checkedRow.id }).then(res => {
        success(res.resultMessage)
        this.refreshHandle()
      })
    },
    editHandle() {
      this.$refs.SysMenuModal.openModal('修改', false, this.checkedRow)
    },
    setQueryParam() {
      return [newQueryParam('=', 'parentId', this.childParentId, this.config.STRING)]
    },
    getTableData(childParentId) {
      this.tableData = []
      this.childParentId = childParentId
      this.tableLoading = true
      this.clearCheckedData()
      const requestData = {
        queryParamList: this.setQueryParam(),
        orderParamList: [
          {
            direction: 'asc',
            property: 'menuOrder'
          }
        ]
      }
      menusReq(requestData).then(res => {
        this.tableLoading = false
        this.tableData = res.data.resultList
      })
    },
    getCheckedRow(row) {
      this.checkedRow = row
    },
    clearCheckedData() {
      this.checkedRow = {}
      this.$refs.TableCustom.clearCheckedId()
    }
  }
}
</script>

<style scoped>

</style>
