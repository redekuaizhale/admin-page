/**
 * js description
 *
 * @author zhanghui
 * @date 2020-08-11
 * @company Dingxuan
 */
const ChartMixins = {
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  watch: {
    '$store.state.collapsed'() {
      this.echartsUtils.widthChangeResize(this.chart)
    }
  }
}
export default ChartMixins
