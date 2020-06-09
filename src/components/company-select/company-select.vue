<!--
 vue description

 @author zhanghui
 @date 2020-03-03
 @company Dingxuan
!-->
<template>
  <Row class="company-select">
    <Col span="4" style="width:350px;">
    <treeselect
      :disabled="disabled"
      v-model="companyId"
      :options="companyList"
      :show-count="false"
      :normalizer="normalizer"
      style="width: 350px"
      no-results-text=" "
      placeholder="请选择"
      no-children-text="无数据"
      @select="companyChangeHandle($event)"
    />
      </Col>
    <Col span="4">
    <Checkbox
      v-if="child"
      v-model="queryChildFlag"
      style="position: relative;top: 0;left: 5px;"
      @on-change="queryChildChange">
      包含子机构
    </Checkbox>
    </Col>
  </Row>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { loginUsercompanyTreeReq } from '../../api/company'

export default {
  name: 'CompanySelect',
  components: { Treeselect },
  props: {
    child: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    paramId: {
      type: String,
      default: 'company.id'
    },
    paramPath: {
      type: String,
      default: 'company.path'
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      companyList: [],
      companyId: this.id,
      path: '',
      queryChildFlag: true,
      normalizer(node) {
        return {
          label: node.fullName
        }
      }
    }
  },
  created() {
    this.queryCompanyData()
  },
  methods: {
    queryCompanyData() {
      loginUsercompanyTreeReq({}).then(res => {
        this.companyList = res.data
        if (!this.companyId) {
          this.companyId = res.data[0].id
        }
        this.commitCompanyId()
      })
    },
    companyChangeHandle(e) {
      const { id, path } = e
      this.companyId = id
      this.path = path
      this.commitSelectedData()
    },
    queryChildChange() {
      this.commitSelectedData()
    },
    commitCompanyId() {
      this.$emit('commit-compnay-id', this.companyId)
    },
    commitSelectedData() {
      let operate, fieldName, fieldValue, fieldValueClass, param
      this.commitCompanyId()
      if (this.child) {
        if (!this.companyId) {
          this.$emit('commit-company-path', param)
          return
        }
        if (this.queryChildFlag) {
          operate = 'like'
          fieldName = this.paramPath
          fieldValue = this.path + '%'
          fieldValueClass = this.config.String
        } else {
          operate = '='
          fieldName = this.paramId
          fieldValue = this.companyId
          fieldValueClass = this.config.String
        }
        param = this.utils.newQueryParam(operate, fieldName, fieldValue, fieldValueClass)
        this.$emit('commit-query-data', param)
      }
    }
  }
}
</script>

<style lang="less">
  .company-select{
    .ivu-checkbox-wrapper{
      white-space: nowrap;
    }
    .vue-treeselect__single-value,.vue-treeselect__menu-container{
      color: #333;
      font-size: 14px;
    }
  }
</style>
