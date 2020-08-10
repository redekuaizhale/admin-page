<!--
 vue description

 @author zhanghui
 @date 2020-08-10
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

    }
  },
  computed: {
    getPageIcon() {
      return this.$router.currentRoute.meta.icon
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
