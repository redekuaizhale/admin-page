<!--
 vue description

 @author zhanghui
 @date 2020-03-03
 @company Dingxuan
!-->
<template>
  <Row class="company-select">
    <Col span="4" style="width: 300px;">
    <treeselect
      :disabled="disabled"
      v-model="companyid"
      :options="companyList"
      :show-count="false"
      :normalizer="normalizer"
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
    }
  },
  data() {
    return {
      companyList: [],
      companyid: '',
      path: '',
      queryChildFlag: true,
      normalizer(node) {
        return {
          label: node.fullName
        }
      }
    }
  },
  watch: {
    'companyid'(value) {
      if (value === undefined) {
        this.commitSelectedData()
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
      })
    },
    companyChangeHandle(e) {
      const { id, path } = e
      this.companyid = id
      this.path = path
      this.commitSelectedData()
    },
    queryChildChange() {
      this.commitSelectedData()
    },
    commitSelectedData() {
      let operate, fieldName, fieldValue, fieldValueClass, param
      this.$emit('commit-compnay-id', this.companyid)
      if (this.child) {
        if (!this.companyid) {
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
          fieldValue = this.companyid
          fieldValueClass = this.config.String
        }
        param = this.utils.newQueryParam(operate, fieldName, fieldValue, fieldValueClass)
        this.$emit('commit-query-data', param)
      }
    },
    setCompanyid(companyid) {
      this.companyid = companyid
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
