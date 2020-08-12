import _ from 'lodash'

export default class mathUtils {
  /**
   * 转数字
   * @param value
   */
  static toNumber(value) {
    if (!value) {
      return 0
    }
    if (typeof value === 'number') {
      return value
    }
    return _.toNumber(value)
  }
  /**
   * 四舍五入,保留两位小数
   * @param value
   * @param number
   */
  static toFixedCustom(value, number) {
    return this.toNumber(value).toFixed(number || 2)
  }
  /**
   * 加法
   * @param a
   * @param b
   */
  static add(a, b) {
    return _.add(this.toNumber(a), this.toNumber(b))
  }

  /**
   * 减法
   * @param a
   * @param b
   */
  static subtract(a, b) {
    return _.subtract(this.toNumber(a), this.toNumber(b))
  }

  /**
   * 乘法
   * @param a
   * @param b
   */
  static multiply(a, b) {
    return _.multiply(this.toNumber(a), this.toNumber(b))
  }

  /**
   * 除法
   * @param a
   * @param b
   */
  static divide(a, b) {
    return _.divide(this.toNumber(a), this.toNumber(b))
  }
}
