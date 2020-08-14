<!--
 vue description

 @author zhanghui
 @date 2020-06-11
 @company Dingxuan
!-->
<template>
  <Row class="home-sick-type-pie" type="flex" justify="center" align="middle" >
    <Col span="14">
    <div ref="dom" class="height-300"/>
    </Col>
    <Col span="10">
    <ul class="tip">
      <li v-for="item in tipData" :key="item.name">
        <span>
          <Icon :color="item.color" type="ios-radio-button-on"/>
        </span>
        <span class="name">
          {{ item.name }}
        </span>
        <Divider type="vertical" />
        <span>
          {{ item.percent }}
        </span>
        <Divider type="vertical" />
        <span>
          {{ item.value }}
        </span>
      </li>
    </ul>
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
      tipData: [],
      total: 0,
      chartData: [
        { value: 1450, name: '种类1' },
        { value: 987, name: '种类2' },
        { value: 875, name: '种类3' },
        { value: 754, name: '种类4' },
        { value: 654, name: '种类5' }
      ],
      chart: {},
      option: {
        title: {
          left: 'center',
          top: 'center',
          text: '',
          subtext: '合计(人/次)'
        },
        color: this.config.ECHARTS_COLOR,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '分类',
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
  created() {
    this.$nextTick(() => {
      this.createChart()
    })
  },
  methods: {
    createChart() {
      this.tipData = []
      let total = 0
      this.chartData.map(item => {
        total = this.mathUtils.add(item.value, total)
      })
      this.chartData.forEach((item, index) => {
        const divideValue = this.mathUtils.divide(item.value, total)
        this.tipData.push({
          color: this.option.color[index],
          name: item.name,
          value: item.value,
          percent: `${this.mathUtils.toFixedCustom(this.mathUtils.toPercent(divideValue))}%`
        })
      })
      this.option.title.text = total
      this.option.series[0].data = this.chartData
      this.chart = this.echarts.init(this.$refs.dom)
      this.chart.setOption(this.option)
      this.echartsUtils.windowResize(this.chart)
    }
  }
}
</script>

<style lang="less">
  .home-sick-type-pie{
    .tip{
      li{
        height: 20px;
        margin-bottom: 12px;
        line-height: 20px;
      }
      list-style: none;
    }
  }
</style>
