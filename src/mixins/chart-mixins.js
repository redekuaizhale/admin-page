/**
 * js description
 *
 * @author zhanghui
 * @date 2020-08-11
 * @company Dingxuan
 */
import { widthChangeResize } from '../libs/echartUtils'
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
      widthChangeResize(this.chart)
    }
  }
}
export default ChartMixins
