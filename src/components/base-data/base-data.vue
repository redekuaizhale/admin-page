<!--
 vue description

 @author zhanghui
 @date 2020-05-22
 @company Dingxuan
!-->
<template>
  <div/>
</template>

<script>
export default {
  name: 'BaseData',
  data() {
    return {
      tableLoading: false,
      checkedRow: {},
      tableData: []
    }
  },
  methods: {
    clearCheckedData() {
      this.checkedRow = {}
      this.$refs.TableCustom.clearCheckedId()
    }
  }
}
</script>

<style scoped>

</style>
