<!--
 vue description

 @author zhanghui
 @date 2020-05-21
 @company Dingxuan
!-->
<template>
  <Table :loading="loading" :columns="initColumns" :data="data" border stripe @on-row-click="onRowClickHandle" />
</template>

<script>
export default {
  name: 'TableCustom',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: Array
    },
    data: {
      type: Array,
      default: Array
    },
    check: {
      type: Boolean,
      default: true
    },
    index: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      checkedId: '',
      operateCheckCol: {
        title: '选中',
        width: 70,
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
      indexCol: {
        title: '序号',
        type: 'index',
        width: 70,
        align: 'center'
      }
    }
  },
  computed: {
    initColumns() {
      const newColumns = [...this.columns]
      if (this.index) {
        newColumns.unshift(this.indexCol)
      }
      if (this.check) {
        newColumns.unshift(this.operateCheckCol)
      }
      return newColumns
    }
  },
  methods: {
    checkChangeHandle(row, check) {
      this.checkedId = check ? row.id : ''
      this.checkChange(row)
    },
    onRowClickHandle(row) {
      /* this.checkedId = row.id
      this.checkChange(row)*/
    },
    clearCheckedId() {
      this.checkedId = ''
    },
    checkChange(row) {
      this.$emit('check-change', this.checkedId ? row : {})
    }
  }
}
</script>

<style scoped>

</style>
