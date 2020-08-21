<!--
 vue description

 @author zhanghui
 @date 2020-08-13
 @company Dingxuan
!-->
<template>
  <div ref="dom" class="height-300"/>
</template>

<script>
import echarts from '../../libs/echarts'
import ChartMixins from '../../mixins/chart-mixins'
import { windowResize } from '../../libs/echartUtils'

export default {
  name: 'HomeDeptTotalLine',
  mixins: [ChartMixins],
  data() {
    return {
      chartData: [
        {
          symbol: 'circle',
          smooth: true,
          name: '部门一',
          type: 'line',
          stack: '人次',
          areaStyle: {},
          lineStyle: {
            width: 3
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          symbol: 'circle',
          smooth: true,
          name: '部门二',
          type: 'line',
          stack: '人次',
          areaStyle: {},
          lineStyle: {
            width: 3
          },
          data: [12, 182, 191, 234, 290, 330, 10]
        },
        {
          symbol: 'circle',
          smooth: true,
          name: '部门三',
          type: 'line',
          stack: '人次',
          areaStyle: {},
          lineStyle: {
            width: 3
          },
          data: [150, 800, 132, 154, 100, 330, 410]
        }
      ],
      chart: {},
      option: {
        color: this.config.ECHARTS_COLOR,
        title: {
          text: '',
          subtext: '单位:人/次'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 'right',
          data: ['部门一', '部门二', '部门三']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['2020-08-01', '2020-08-02', '2020-08-03', '2020-08-04', '2020-08-05', '2020-08-06', '2020-08-07']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: []
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
      this.option.series = this.chartData
      this.chart = echarts.init(this.$refs.dom)
      this.chart.setOption(this.option)
      windowResize(this.chart)
    }
  }
}
</script>

<style scoped>

</style>
