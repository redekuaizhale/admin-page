<!--
 vue description

 @author zhanghui
 @date 2020-05-26
 @company Dingxuan
!-->
<template>
  <div>
    <Page
      :current.sync="currentPage"
      :total="total"
      :page-size="currentPageSize"
      show-sizer
      prev-text="上一页"
      next-text="下一页"
      show-total
      @on-change="pageNumChangeHandle"
      @on-page-size-change="pageSizeChangeHandle"
    />
  </div>
</template>

<script>
export default {
  name: 'PageCustom',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    pageNum: {
      type: Number
    },
    // eslint-disable-next-line vue/require-default-prop
    total: {
      type: Number
    },
    // eslint-disable-next-line vue/require-default-prop
    pageSize: {
      type: Number
    }
  },
  data() {
    return {
      currentPage: this.pageNum,
      currentPageSize: this.pageSize
    }
  },
  methods: {
    pageNumChangeHandle(pageNum) {
      this.$emit('on-change', pageNum)
    },
    pageSizeChangeHandle(pageSize) {
      this.$emit('on-page-size-change', pageSize)
    }
  }
}
</script>

<style scoped>

</style>
