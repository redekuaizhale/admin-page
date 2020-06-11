import '@babel/polyfill'
import Vue from 'vue'
import App from './App'
import router from './router/permissions'
import iviewArea from 'iview-area'
import store from './store'
import ViewUI from 'view-design'
import config from './config/config'
import './index.less'
import '@/assets/icons/iconfont.css'
import commonUtils from './libs/commonUtils'
import dateUtils from './libs/dateUtils'
import echarts from 'echarts'

Vue.use(ViewUI)
Vue.use(iviewArea)
Vue.prototype.config = config
Vue.prototype.utils = commonUtils
Vue.prototype.dateUtils = dateUtils
Vue.prototype.echarts = echarts

const develop_mode = process.env.NODE_ENV !== 'production'
Vue.config.debug = develop_mode
Vue.config.devtools = develop_mode
Vue.config.productionTip = develop_mode

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
