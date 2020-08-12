<!--
 vue description

 @author zhanghui
 @date 2020-06-11
 @company Dingxuan
!-->
<template>
  <Row>
    <Col span="12">
    <div ref="dom" class="height-350"/>
    </Col>
    <Col>
    <div>222</div>
    </Col>
  </Row>
</template>

<script>
import ChartMixins from '../../mixins/chart-mixins'

export default {
  name: 'HomeSickTypePie',
  mixins: [ChartMixins],
  data() {
    return {
      total: 0,
      chartData: [
        { value: 335, name: '种类1' },
        { value: 310, name: '种类2' },
        { value: 234, name: '种类3' },
        { value: 135, name: '种类4' },
        { value: 354, name: '种类5' }
      ],
      chart: {},
      option: {
        title: {
          left: 'center',
          top: 'center',
          text: '',
          subtext: '合计(人/次)'
        },
        color: ['#5DB1FF', '#A97BE9', '#59D4D4', '#6DD48C', '#6B769F', '#F47F92'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['center', 'center'],
            radius: ['50%', '70%'],
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              borderWidth: 4,
              borderColor: '#fff'
            },
            data: []
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
      let total = 0
      this.chartData.map(item => {
        total = this.mathUtils.add(item.value, total)
      })
      this.option.title.text = this.mathUtils.toFixedCustom(total)
      this.option.series[0].data = this.chartData
      this.chart = this.echarts.init(this.$refs.dom)
      this.chart.setOption(this.option)
      this.echartsUtils.windowResize(this.chart)
    }
  }
}
</script>

<style scoped>

</style>
