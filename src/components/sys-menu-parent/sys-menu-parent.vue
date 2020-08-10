<!--
 vue description

 @author zhanghui
 @date 2019-12-18
 @company Dingxuan
!-->
<template>
  <Card>
    <p slot="title">
      一级菜单
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
        :columns="tableColumns"
        :data="tableData"
        :check="true"
        :loading="tableLoading"
        @check-change="getCheckedRow"
      />
      <SysMenuModal ref="SysMenuModal" :parent-id="parentId" @update-memu="getTableData"/>
    </div>
  </Card>
</template>

<script>
import { menusReq, menuDeleteReq } from '../../api/menu'
import CrudButtonGroup from '../crud-button-group/crud-button-group'
import SysMenuModal from '../sys-menu-modal/sys-menu-modal'
import TableCustom from '../table-custom/table-custom'
import BaseTableData from '../base-table-data/base-table-data'

export default {
  name: 'SysMenuParent',
  components: { BaseTableData, TableCustom, SysMenuModal, CrudButtonGroup },
  extends: BaseTableData,
  props: {
    parentId: {
      type: String,
      default: ''
    }
  },
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
            return h(CommonIcon, {
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
      this.$refs.SysMenuModal.openModal('新增', true, null)
    },
    deleteHandle() {
      menuDeleteReq({ id: this.checkedRow.id }).then(res => {
        this.utils.success(res.resultMessage)
        this.getTableData()
      })
    },
    editHandle() {
      this.$refs.SysMenuModal.openModal('修改', false, this.checkedRow)
    },
    setQueryParam() {
      return [this.utils.newQueryParam('=', 'parentId', this.parentId, this.config.String)]
    },
    getTableData() {
      this.tableData = []
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
        if (res.data.resultList) {
          this.tableData = res.data.resultList
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    getCheckedRow(row) {
      this.checkedRow = row
      this.$emit('update-parent-id', row.id)
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
