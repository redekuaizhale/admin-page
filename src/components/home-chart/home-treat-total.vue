<!--
 vue description

 @author zhanghui
 @date 2020-06-11
 @company Dingxuan
!-->
<template>
  <div ref="dom"/>
</template>

<script>
import ChartMixins from '../../mixins/chart-mixins'

export default {
  name: 'HomeTreatTotal',
  mixins: [ChartMixins],
  data() {
    return {
      chart: {},
      option: {
        tooltip: {},
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        grid: {
          top: '5%',
          left: '2%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        color: ['#58AFFF'],
        yAxis: {
          name: '单位:人/次',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: '治疗人次',
            type: 'bar',
            barMaxWidth: 40,
            data: [414, 700, 200, 600, 800, 1200, 540, 874, 3000, 200, 471, 658]
          }
        ]
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.createChart()
    })
  },
  methods: {
    createChart() {
      this.chart = this.echarts.init(this.$refs.dom)
      this.chart.setOption(this.option)
      this.echartsUtils.windowResize(this.chart)
    }
  }
}
</script>

<style scoped>

</style>
