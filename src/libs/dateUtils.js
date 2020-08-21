import dayjs from 'dayjs'

/**
 * 获取当前时间
 * @returns {string}
 */
export const currentDateString = () => {
  return this.formatDate(dayjs())
}

/**
 * 格式化日期
 * @param date
 * @param pattern
 * @returns {string}
 */
export const formatDate = (date, pattern) => {
  if (!pattern) {
    pattern = 'YYYY-MM-DD HH:mm:ss'
  }
  if (!date) {
    return ''
  }
  if (typeof date === 'string') {
    return date
  }
  return dayjs(date).format(pattern)
}
