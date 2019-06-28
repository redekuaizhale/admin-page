// Vue
import Vue from 'vue'
import App from './App'
// 核心插件
import d2Admin from './plugin/d2admin'
// store
import store from './store/index'
// 多国语
import i18n from './i18n'
// 菜单和路由设置
import router from './router'
import menuHeader from './menu/header'
import menuAside from './menu/aside'
import { frameInRoutes } from './router/routes'
import config from './setting'
import util from './libs/util'
// 核心插件
Vue.use(d2Admin)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    if (!util.cookies.get('token')) {
      return
    }
    // 获取用户路由信息
    this.$store.dispatch('d2admin/pushrouter/init')
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')
