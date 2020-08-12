/**
 * js description
 *
 * @author zhanghui
 * @date 2020-08-11
 * @company Dingxuan
 */
const BaseMixins = {
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {
    getPageIcon() {
      return this.$router.currentRoute.meta.icon
    }
  }
}
export default BaseMixins
