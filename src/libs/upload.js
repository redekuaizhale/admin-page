import axios from 'axios'
import configs from '../config/config'
import commonUtils from '../libs/commonUtils'
import Vue from 'vue'
const baseUrl = process.env.NODE_ENV === 'production' ? configs.BASE_URL.PRO : configs.BASE_URL.DEV

const upload = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: { 'Content-Type': 'multipart/form-data' },
  timeout: 30000
})

upload.interceptors.request.use(config => {
  config.headers.Authorization = commonUtils.getCookie(configs.USER_TOKEN_KEY)
  return config
}, error => {
  Promise.reject(error)
})

upload.interceptors.response.use(
  response => {
    const { resultCode, resultMessage } = response.data
    if (resultCode !== configs.API_SUCCESS_CODE) {
      commonUtils.error(resultMessage)
      return Promise.reject(resultMessage)
    } else {
      return response.data
    }
  },
  error => {
    commonUtils.error(error.response.data.message)
    return Promise.reject(error)
  }
)

Vue.config.productionTip = false
Vue.prototype.instance = upload
export default upload
