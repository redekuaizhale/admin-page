<!--
 vue description

 @author zhanghui
 @date 2020-06-11
 @company Dingxuan
!-->
<template>
  <div id="test" ref="dom"/>
</template>

<script>
export default {
  name: 'HomeTreatTotal',
  data() {
    return {
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
  mounted() {
    this.$nextTick(() => {
      this.createChart()
    })
  },
  methods: {
    createChart() {
      const chart = this.echarts.init(this.$refs.dom)
      chart.setOption(this.option)
      window.onresize = chart.resize
    }
  }
}
</script>

<style scoped>

</style>
