<!--
 vue description

 @author zhanghui
 @date 2020-05-28
 @company Dingxuan
!-->
<template>
  <Card>
    <p slot="title">
      <CommonIcon type="_dept"/>
      部门管理
    </p>
    <div>
      <div class="query-form">
        <Form :model="queryForm" :label-width="80" inline>
          <FormItem label="机构:">
            <CompanySelect :child="false" @commit-compnay-id="updateCompanyId"/>
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
        />
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
      <SysDeptModal ref="SysDeptModal" :company-id="queryForm.companyId" @update-dept="refreshHandle"/>
    </div>
  </Card>
</template>

<script>
import CompanySelect from '../../components/company-select/company-select'
import CrudButtonGroup from '../../components/crud-button-group/crud-button-group'
import BaseTableData from '../../components/base-table-data/base-table-data'
import TableCustom from '../../components/table-custom/table-custom'
import PageCustom from '../../components/page-custom/page-custom'
import SysDeptModal from '../../components/sys-dept-modal/sys-dept-modal'
import { deptsReq, deptDeleteReq } from '../../api/dept'

export default {
  name: 'SysDept',
  components: { SysDeptModal, PageCustom, TableCustom, BaseTableData, CrudButtonGroup, CompanySelect },
  extends: BaseTableData,
  data() {
    return {
      queryForm: {
        companyId: ''
      },
      tableColumns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '名称',
          key: 'name',
          width: 200
        },
        {
          title: '排序',
          key: 'deptOrder',
          width: 200
        },
        {
          title: '备注',
          key: 'remark'
        }
      ]
    }
  },
  methods: {
    setQueryParam() {
      const { companyId } = this.queryForm
      const params = []
      if (companyId) {
        params.push(this.utils.newQueryParam('=', 'companyEntity.id', companyId, this.config.String))
      }
      return params
    },
    getTableData() {
      this.tableData = []
      this.clearCheckedData()
      if (!this.queryForm.companyId) {
        return
      }
      this.tableLoading = true
      const requestData = {
        queryParamList: this.setQueryParam()
      }
      deptsReq(requestData).then(res => {
        if (res.data.resultList) {
          this.tableData = res.data.resultList
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    refreshHandle() {
      this.getTableData()
    },
    addHandle() {
      if (!this.queryForm.companyId) {
        this.utils.warning('请先选择机构！')
        return
      }
      this.$refs.SysDeptModal.openModal('新增', true, null)
    },
    editHandle() {
      this.$refs.SysDeptModal.openModal('修改', false, this.checkedRow)
    },
    deleteHandle() {
      deptDeleteReq({ id: this.checkedRow.id }).then(res => {
        this.utils.success(res.resultMessage)
        this.getTableData()
      })
    },
    getCheckedRow(row) {
      this.checkedRow = row
    },
    updateCompanyId(companyId) {
      this.queryForm.companyId = companyId
      this.getTableData()
    }
  }
}
</script>

<style scoped>

</style>
