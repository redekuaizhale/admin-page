<!--
 vue description

 @author zhanghui
 @date 2019-12-18
 @company Dingxuan
!-->
<template>
  <div>
    <CrudButtonGroup
      ref="crudButtonGroup"
      :checked-id="checkedId"
      @add="addHandle"
      @delete="deleteHandle"
      @edit="editHandle"
      @refresh="refreshHandle"
    />
    <Table :loading="tableLoading" :columns="tableColumns" :data="tableData" border stripe/>
    <SysMenuModal ref="sysMenuModal" @update-data="getTableData"/>
  </div>
</template>

<script>
import { menusReq } from '../../api/menu'
import CommonIcon from '../common-icon/common-icon'
import CrudButtonGroup from '../crud-button-group/crud-button-group'
import SysMenuModal from '../sys-menu-modal/sys-menu-modal'

export default {
  name: 'SysMenuParent',
  components: { SysMenuModal, CrudButtonGroup, CommonIcon },
  data() {
    return {
      checkedId: '',
      tableColumns: [
        {
          title: '选中',
          width: '70',
          render: (h, params) => {
            return h('div', [
              h('Checkbox', {
                props: {
                  value: params.row.id === this.checkedId
                },
                on: {
                  'on-change': ($event) => {
                    this.checkChangeHandle(params.row, $event)
                  }
                }
              })
            ])
          }
        },
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
          title: '是否可用',
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
      ],
      tableLoading: false,
      tableData: []
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
      console.info('add',)
      this.$refs.sysMenuModal.openModal('新增', true, null)
    },
    deleteHandle() {
      console.info('delete',)
    },
    editHandle() {
      console.info('edit',)
    },

    setQueryParam() {
      return [this.utils.newQueryParam('=', 'parentId', '0', this.config.String)]
    },
    getTableData() {
      this.tableLoading = true
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
        this.tableData = res.data
      }).finally(() => {
        this.tableLoading = false
      })
    },
    checkChangeHandle(row, check) {
      this.checkedId = check ? row.id : ''
    }
  }
}
</script>

<style scoped>

</style>
