<!--
 vue description

 @author zhanghui
 @date 2019-11-28
 @company Dingxuan
!-->
<template>
  <Card>
    <p slot="title">
      <CommonIcon type="_menu-user"/>
      用户管理
    </p>
    <div>
      <div class="query-form">
        <Form :model="queryForm" :label-width="80" inline>
          <FormItem label="姓名：">
            <Input v-model="queryForm.name" type="text" placeholder="">
            </Input>
          </FormItem>
          <FormItem label="登录名：">
            <Input v-model="queryForm.loginCode" type="text" placeholder="">
            </Input>
          </FormItem>
          <FormItem>
            <Button icon="md-search" type="primary" @click="queryListHandle()">查询</Button>
            <Button icon="md-add" class="margin-left-10" type="primary" @click="addListHandle()">新增</Button>
          </FormItem>
        </Form>
      </div>
      <div class="query-result">
        <Table
          :columns="columns"
          :data="data"
          stripe
          size="small"
        />
        <Page
          :current.sync="pageNum"
          :total="total"
          :page-size="pageSize"
          show-sizer
          prev-text="上一页"
          next-text="下一页"
          show-total
          @on-change="pageNumChangeHandle"
          @on-page-size-change="pageSizeChangeHandle"
        />
      </div>
    </div>
  </Card>
</template>

<script>
import CommonIcon from '../../components/common-icon/common-icon'
export default {
  name: 'SysUser',
  components: { CommonIcon },
  data() {
    return {
      queryForm: {
        name: '',
        loginCode: ''
      },
      columns: [],
      data: [],
      total: 0,
      pageNum: 0,
      pageSize: 10
    }
  },
  methods: {
    queryListHandle() {

    },
    addListHandle() {

    },
    pageNumChangeHandle() {

    },
    pageSizeChangeHandle() {

    }
  }
}
</script>

<style scoped>

</style>
