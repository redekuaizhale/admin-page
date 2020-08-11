export default class echartUtils {
  /**
   * echart根据div 宽度自适应
   * @param chart
   */
  static widthChangeResize(chart) {
    setTimeout(() => {
      chart.resize()
    }, 200)
  }

  /**
   * 根据窗口大小自适应
   * @param chart
   */
  static windowResize(chart) {
    window.onresize = chart.resize
  }
}
