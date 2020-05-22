<!--
 vue description

 @author zhanghui
 @date 2019-12-18
 @company Dingxuan
!-->
<template>
  <div>
    <SysMenuParent :parent-id="parentId" @update-parent-id="updateParentId"/>
    <SysMenuChild :parent-id="childParentId" @update-child-parent-id="updateChildParentId"/>
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
      parentId: '0',
      childParentId: ''
    }
  },
  created() {
  },
  methods: {
    updateParentId(parentId) {
      this.parentId = parentId
    },
    updateChildParentId(childParentId) {
      this.childParentId = childParentId
    }
  }
}
</script>

<style scoped>

</style>
