/**
 * 通用工具类
 * @author zhanghui
 * @date 2019-11-25
 * @company Dingxuan
 */
import Cookie from 'js-cookie'
import { Notice, Message } from 'view-design'
import router from '../router/permissions'

export default class commonUtils {
  /**
   * 设置cookie
   * @param key
   * @param value
   */
  static setCookie(key, value) {
    Cookie.set(key, value)
  }

  /**
   * 获取cookie
   * @param key
   * @param value
   * @returns {*}
   */
  static getCookie(key, value) {
    return Cookie.get(key)
  }

  /**
   * 清空cookie
   * @param key
   */
  static removeCookie(key) {
    Cookie.remove(key)
  }

  /**
   * 路由push
   * @param name
   * @param params
   */
  static routerPush(name, params) {
    router.push({
      name: name,
      params: params
    })
  }

  /**
   * 成功提示
   * @param title
   */
  static success(title) {
    Notice.success({
      title: title,
      duration: 10
    })
  }

  /**
   * 失败提示
   * @param desc
   */
  static error(desc) {
    Notice.error({
      title: '操作失败，请稍后再试',
      desc: '失败原因->' + desc,
      duration: 10
    })
  }

  /**
   * 未选中数据提示
   */
  static uncheckedError() {
    Message['error']({
      background: true,
      content: '请先选中一条数据！'
    })
  }
  /**
   * 格式化金额
   * @param s
   * @returns {string}
   */
  static toThousands(s) {
    const type = 2
    if (/[^0-9\.]/.test(s)) { return '0.00' }
    if (s == null || s === 'null' || s === '') { return '0.00' }
    s = s.toString().replace(/^(\d*)$/, '$1.')
    s = (s + '00').replace(/(\d*\.\d\d)\d*/, '$1')
    s = s.replace('.', ',')
    const re = /(\d)(\d{3},)/
    while (re.test(s)) { s = s.replace(re, '$1,$2') }
    s = s.replace(/,(\d\d)$/, '.$1')
    if (type === 0) {
      const a = s.split('.')
      if (a[1] === '00') {
        s = a[0]
      }
    }
    return s
  }

  /**
   * 创建查询参数
   * @param operate
   * @param fileldName
   * @param fieldValue
   * @param fieldValueClass
   * @returns {{operate: *, fieldName: *, fieldValueClass: *, fieldValue: *}}
   */
  static newQueryParam(operate, fileldName, fieldValue, fieldValueClass) {
    return {
      operate: operate,
      fieldName: fileldName,
      fieldValue: fieldValue,
      fieldValueClass: fieldValueClass
    }
  }
}
