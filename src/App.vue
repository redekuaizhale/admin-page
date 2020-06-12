<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  created() {
    this.initDevice()
    this.initUserMenuAndRouterData()
  },
  methods: {
    initUserMenuAndRouterData() {
      if (!this.utils.checkIsLoginPage() && this.utils.getLoginUserToken()) {
        this.$store.dispatch('setUserMenu')
      }
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    initDevice() {
      this.$store.dispatch('setDevice', this.utils.checkDeviceIsMobile())
    }
  }
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
