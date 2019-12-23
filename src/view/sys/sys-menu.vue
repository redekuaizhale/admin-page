<!--
 vue description

 @author zhanghui
 @date 2019-12-18
 @company Dingxuan
!-->
<template>

  <Card>
    <p slot="title">
      <CommonIcon type="_menu"/>
      菜单管理
    </p>
    <div>
      <SysMenuParent/>
    </div>
  </Card>

</template>

<script>
import CommonIcon from '../../components/common-icon/common-icon'
import SysMenuParent from '../../components/sys-menu-parent/sys-menu-parent'
export default {
  name: 'SysMenu',
  components: { SysMenuParent, CommonIcon },
  data() {
    return {

    }
  },
  created() {
    console.info('fuqi',)
  }
}
</script>

<style scoped>

</style>
