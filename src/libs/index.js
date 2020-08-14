import Vue from 'vue'

import commonUtils from './commonUtils'
import dateUtils from './dateUtils'
import echarts from 'echarts'
import echartUtils from './echartUtils'
import mathUtils from './mathUtils'
import config from '../config/config'

Vue.prototype.config = config
Vue.prototype.utils = commonUtils
Vue.prototype.dateUtils = dateUtils
Vue.prototype.echarts = echarts
Vue.prototype.echartsUtils = echartUtils
Vue.prototype.mathUtils = mathUtils
