import axios from 'axios'
import configs from '../config/config'
import commonUtils from '../libs/commonUtils'
const baseUrl = process.env.NODE_ENV === 'production' ? configs.baseUrl.pro : configs.baseUrl.dev

const service = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  timeout: 30000
})

service.interceptors.request.use(config => {
  config.headers.Authorization = commonUtils.getCookie(configs.userTokenKey)
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const { resultCode, resultMessage } = response.data
    if (resultCode !== configs.apiSuccessCode) {
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

export default service