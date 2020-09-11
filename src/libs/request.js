import axios from 'axios'
import configs from '../config/config'
import { getCookie, error } from './commonUtils'

const baseUrl = process.env.NODE_ENV === 'production' ? configs.BASE_URL.PRO : configs.BASE_URL.DEV

const service = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  timeout: 30000
})

service.interceptors.request.use(config => {
  config.headers.Authorization = getCookie(configs.USER_TOKEN_KEY)
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const { resultCode, resultMessage } = response.data
    if (resultCode !== configs.API_SUCCESS_CODE) {
      error(resultMessage)
      return Promise.reject(resultMessage)
    } else {
      return response.data
    }
  },
  e => {
    error(e.response.data.message)
    return Promise.reject(error)
  }
)

export default service
