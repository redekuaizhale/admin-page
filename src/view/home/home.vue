<!--
 vue description

 @author zhanghui
 @date 2019-11-22
 @company Dingxuan
!-->
<template>
  <div>
    <Card>
      <p slot="title">
        测试
      </p>
      <div>
        <Row>
          <Col id="col1" ref="test" span="12">
          <h4 id="h4">访问量趋势</h4>
          <HomeTreatTotal/>
          </Col>
          <Col span="12">
          <h4>访问量趋势</h4>
          <HomeSickTypeTotal/>
          </Col>
        </Row>
      </div>
    </Card>
  </div>
</template>

<script>
import HomeTreatTotal from '../../components/home-chart/home-treat-total'
import HomeSickTypeTotal from '../../components/home-chart/home-sick-type-total'
export default {
  name: 'Home',
  components: { HomeSickTypeTotal, HomeTreatTotal },
  created() {
  },
  mounted() {
    const width = document.getElementById('h4').offsetWidth
    console.info('h4', width)
  }
}
</script>

<style scoped>

</style>
