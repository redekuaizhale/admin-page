<!--
 vue description

 @author zhanghui
 @date 2020-05-28
 @company Dingxuan
!-->
<template>
  <Card>
    <p slot="title">
      <CommonIcon :type="getPageIcon" :size="getPageIconSize" />
      部门管理
    </p>
    <div>
      <div class="query-form">
        <Form :model="queryForm" :label-width="80" inline>
          <FormItem label="机构:">
            <CompanySelect :clearable="false" :child="false" @commit-compnay-id="updateCompanyId" />
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
          :index="false"
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
      <SysDeptModal ref="SysDeptModal" :company-id="queryForm.companyId" @update-dept="refreshHandle" />
    </div>
  </Card>
</template>

<script>
import CompanySelect from '../../components/company-select/company-select'
import CrudButtonGroup from '../../components/crud-button-group/crud-button-group'
import TableCustom from '../../components/table-custom/table-custom'
import PageCustom from '../../components/page-custom/page-custom'
import SysDeptModal from '../../components/sys-dept-modal/sys-dept-modal'
import { deptsReq, deptDeleteReq } from '../../api/dept'
import BaseMixins from '../../mixins/base-mixins'
import TableMixins from '../../mixins/table-mixins'
import { newQueryParam, success } from '../../libs/commonUtils'

export default {
  name: 'SysDept',
  components: { SysDeptModal, PageCustom, TableCustom, CrudButtonGroup, CompanySelect },
  mixins: [BaseMixins, TableMixins],
  data() {
    return {
      queryForm: {
        companyId: ''
      },
      tableColumns: [
        {
          title: '排序',
          key: 'deptOrder',
          width: 70
        },
        {
          title: '名称',
          key: 'name',
          width: 200
        },
        {
          title: '成立日期',
          key: 'setupDate',
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
    setQueryRequest() {
      const { companyId } = this.queryForm
      const params = []
      if (companyId) {
        params.push(newQueryParam('=', 'companyEntity.id', companyId, this.config.STRING))
      }
      return {
        pageNum: this.pageNum - 1,
        pageSize: this.pageSize,
        queryParamList: params
      }
    },
    getTableData() {
      this.tableData = []
      this.clearCheckedData()
      if (!this.queryForm.companyId) {
        return
      }
      this.tableLoading = true
      const requestData = this.setQueryRequest()
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
        success(res.resultMessage)
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
