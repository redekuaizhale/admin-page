<!--
 vue description

 @author zhanghui
 @date 2020-05-26
 @company Dingxuan
!-->
<template>
  <div>
    <Page
      :current.sync="pageNum"
      :total="total"
      :page-size="pageSize"
      show-sizer
      prev-text="上一页"
      next-text="下一页"
      show-total
      show-elevator
      @on-change="pageNumChangeHandle"
      @on-page-size-change="pageSizeChangeHandle"
    />
  </div>
</template>

<script>
export default {
  name: 'PageCustom',
  props: {
    pageNum: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {}
  },
  methods: {
    pageNumChangeHandle(pageNum) {

    },
    pageSizeChangeHandle(pageSize) {

    }
  }
}
</script>

<style scoped>

</style>
