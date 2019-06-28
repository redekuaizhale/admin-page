import dayjs from 'dayjs'

/**
 * 格式化时间
 * @param date
 * @param format
 * @returns {string}
 */
export const dateToString = (date, format) => {
  if (!date) {
    return ''
  }
  format = format || 'YYYY-MM-DD HH:mm:ss'
  return dayjs(date).format(format)
}
