import '@babel/polyfill'
import Vue from 'vue'
import App from './App'
import router from './router/permissions'
import store from './store'
import ViewUI from 'view-design'
import './index.less'
import './libs/index'
import './components/index/index'
Vue.use(ViewUI)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
