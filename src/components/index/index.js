import Vue from 'vue'
import CommonIcon from '../common-icon/common-icon'
import DateCustom from '../date-custom/date-custom'
import iviewArea from 'iview-area'
import Textarea from '../textarea/textarea'
Vue.component(CommonIcon.name, CommonIcon)
Vue.component(DateCustom.name, DateCustom)
Vue.component(Textarea.name, Textarea)
Vue.use(iviewArea)
