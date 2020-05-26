<!--
 vue description

 @author zhanghui
 @date 2019-12-18
 @company Dingxuan
!-->
<template>
  <div>
    <SysMenuParent parent-id="0" @update-parent-id="updateParentId"/>
    <SysMenuChild ref="SysMenuChild"/>
  </div>
</template>

<script>
import CommonIcon from '../../components/common-icon/common-icon'
import SysMenuParent from '../../components/sys-menu-parent/sys-menu-parent'
import SysMenuChild from '../../components/sys-menu-child/sys-menu-child'
export default {
  name: 'SysMenu',
  components: { SysMenuChild, SysMenuParent, CommonIcon },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    updateParentId(childParentId) {
      if (!childParentId) {
        return
      }
      this.$refs.SysMenuChild.getTableData(childParentId)
    }
  }
}
</script>

<style scoped>

</style>
