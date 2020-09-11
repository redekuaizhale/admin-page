<!--
 vue description

 @author zhanghui
 @date 2019-11-28
 @company Dingxuan
!-->
<template>
  <Card>
    <p slot="title">
      <CommonIcon :type="getPageIcon" :size="getPageIconSize"/>
      参数配置
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
      <SysParameterModal ref="SysParameterModal" @update-parameter="refreshHandle"></SysParameterModal>
    </div>
  </Card>
</template>

<script>
import TableCustom from '../../components/table-custom/table-custom'
import { parameterDeleteReq, parametersReq } from '../../api/parameter'
import CrudButtonGroup from '../../components/crud-button-group/crud-button-group'
import BaseMixins from '../../mixins/base-mixins'
import TableMixins from '../../mixins/table-mixins'
import { success } from '../../libs/commonUtils'
import SysParameterModal from '../../components/sys-parameter-modal/sys-parameter-modal'

export default {
  name: 'SysParameter',
  components: { SysParameterModal, CrudButtonGroup, TableCustom },
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
          title: 'parameterKey',
          key: 'parameterKey',
          width: 200
        },
        {
          title: '参数1',
          key: 'value'
        },
        {
          title: '参数2',
          key: 'value2'
        },
        {
          title: '参数3',
          key: 'value3'
        },
        {
          title: '参数4',
          key: 'value4'
        },
        {
          title: '参数5',
          key: 'value5'
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
      this.$refs.SysParameterModal.openModal('新增', true, null)
    },
    editHandle() {
      this.$refs.SysParameterModal.openModal('修改', false, this.checkedRow)
    },
    deleteHandle() {
      parameterDeleteReq({ id: this.checkedRow.id }).then(res => {
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
      parametersReq(requestData).then(res => {
        if (res.data.resultList) {
          this.tableData = res.data.resultList
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    getCheckedRow(row) {
      this.checkedRow = row
    }
  }
}
</script>

<style scoped>

</style>
