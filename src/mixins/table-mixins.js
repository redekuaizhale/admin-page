/**
 * js description
 *
 * @author zhanghui
 * @date 2020-08-11
 * @company Dingxuan
 */
const TableMixins = {
  data() {
    return {
      tableLoading: false,
      checkedRow: {},
      tableData: [],
      pageNum: this.config.pageNum,
      pageSize: this.config.pageSize,
      total: this.config.total
    }
  },
  methods: {
    clearCheckedData() {
      this.checkedRow = {}
      if (this.$refs.TableCustom) {
        this.$refs.TableCustom.clearCheckedId()
      }
    },
    pageNumChangeHandle(pageNum) {
      this.pageNum = pageNum
      this.getTableData()
    },
    pageSizeChangeHandle(pageSize) {
      this.pageSize = pageSize
      this.getTableData()
    }
  }
}
export default TableMixins
