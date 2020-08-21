/**
 * echart根据div 宽度自适应
 * @param chart
 */
export const widthChangeResize = (chart) => {
  setTimeout(() => {
    chart.resize()
  }, 200)
}

/**
 * 根据窗口大小自适应
 * @param chart
 */
export const windowResize = (chart) => {
  window.addEventListener('resize', () => {
    chart.resize()
  })
}
