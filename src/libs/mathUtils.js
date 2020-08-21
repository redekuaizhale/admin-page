const _ = require('lodash/fp/math')

/**
 * 转数字
 * @param value
 */
export const toNumber = (value) => {
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
export const toFixedCustom = (value, number) => {
  return toNumber(value).toFixed(number || 2)
}
/**
 * 转换百分数
 * @param value
 * @returns {*}
 */
export const toPercent = (value) => {
  return multiply(toNumber(value), 100)
}
/**
 * 加法
 * @param a
 * @param b
 */
export const add = (a, b) => {
  return _.add(toNumber(a), toNumber(b))
}
/**
 * 加法(保留两位小数)
 * @param a
 * @param b
 */
export const addToFixed = (a, b) => {
  return toFixedCustom(add(a, b))
}
/**
 * 减法
 * @param a
 * @param b
 */
export const subtract = (a, b) => {
  return _.subtract(toNumber(a), toNumber(b))
}
/**
 * 减法(保留两位小数)
 * @param a
 * @param b
 */
export const subtractToFixed = (a, b) => {
  return toFixedCustom(subtract(a, b))
}
/**
 * 乘法
 * @param a
 * @param b
 */
export const multiply = (a, b) => {
  return _.multiply(toNumber(a), toNumber(b))
}
/**
 * 乘法(保留两位小数)
 * @param a
 * @param b
 */
export const multiplyToFixed = (a, b) => {
  return toFixedCustom(multiply(a, b))
}
/**
 * 除法
 * @param a
 * @param b
 */
export const divide = (a, b) => {
  return _.divide(toNumber(a), toNumber(b))
}
/**
 * 除法(保留两位小数)
 * @param a
 * @param b
 */
export const divideToFixed = (a, b) => {
  return toFixedCustom(divide(a, b))
}
