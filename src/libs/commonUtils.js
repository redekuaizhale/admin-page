/**
 * 通用工具类
 * @author zhanghui
 * @date 2019-11-25
 * @company Dingxuan
 */
import Cookie from 'js-cookie'
import { Notice, Message } from 'view-design'
import router from '../router/permissions'

import config from '../config/config'

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
   * 获取登录Token
   * @returns {any}
   */
  static getLoginUserToken() {
    return Cookie.get(config.userTokenKey)
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
    Message.success({
      background: true,
      content: title
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

  static warning(title) {
    Message['error']({
      background: true,
      content: title
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
   * 未选中数据提示
   */
  static isChecked(id) {
    if (!id) {
      this.uncheckedError()
      return false
    } else {
      return true
    }
  }

  /**
   * 格式化金额
   * @param s
   * @returns {string}
   */
  static toThousands(s) {
    const type = 2
    if (/[^0-9\.]/.test(s)) {
      return '0.00'
    }
    if (s == null || s === 'null' || s === '') {
      return '0.00'
    }
    s = s.toString().replace(/^(\d*)$/, '$1.')
    s = (s + '00').replace(/(\d*\.\d\d)\d*/, '$1')
    s = s.replace('.', ',')
    const re = /(\d)(\d{3},)/
    while (re.test(s)) {
      s = s.replace(re, '$1,$2')
    }
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

  /**
   * 是否是登录页面
   * @returns {boolean}
   */
  static checkIsLoginPage() {
    const { hash } = window.location
    return hash.indexOf('login') > 0
  }

  /**
   * 分隔字符串
   * @param value
   * @param char
   * @returns {*}
   */
  static splitContent = (value, char) => {
    return value ? value.split(char) : ''
  }

  /**
   * 去重数据元素
   * @param arr
   */
  static removeArrayRepeat = (arr) => {
    if (!arr || arr.length === 0) {
      return []
    }
    return Array.from(new Set(arr))
  }

  /**
   * @description 绑定事件 on(element, event, handler)
   */
  static on = (function() {
    console.info('3131312',)
    if (document.addEventListener) {
      return function(element, event, handler) {
        if (element && event && handler) {
          element.addEventListener(event, handler, false)
        }
      }
    } else {
      return function(element, event, handler) {
        if (element && event && handler) {
          element.attachEvent('on' + event, handler)
        }
      }
    }
  })()

  /**
   * @description 解绑事件 off(element, event, handler)
   */
  static off = (function() {
    if (document.removeEventListener) {
      return function(element, event, handler) {
        if (element && event) {
          element.removeEventListener(event, handler, false)
        }
      }
    } else {
      return function(element, event, handler) {
        if (element && event) {
          element.detachEvent('on' + event, handler)
        }
      }
    }
  })()
}
