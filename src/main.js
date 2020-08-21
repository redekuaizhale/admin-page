import Vue from 'vue'
import App from './App'
import router from './router/permissions'
import store from './store'
import ViewUI from 'view-design'
import './index.less'
import config from './config/config'
import CommonIcon from './components/common-icon/common-icon'
import DateCustom from './components/date-custom/date-custom'
import Textarea from './components/textarea/textarea'
Vue.component(CommonIcon.name, CommonIcon)
Vue.component(DateCustom.name, DateCustom)
Vue.component(Textarea.name, Textarea)
Vue.prototype.config = config
Vue.use(ViewUI)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
