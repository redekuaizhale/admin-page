import util from '../../../../libs/util'
export default {
  methods: {
    handleMenuSelect (name) {
      if (/^d2-menu-empty-\d+$/.test(name) || name === undefined) {
        this.$message.warning('菜单有误！')
      } else if (/^https:\/\/|http:\/\//.test(name)) {
        util.open(name)
      } else {
        this.$router.push({
          name: name
        })
      }
    }
  }
}
