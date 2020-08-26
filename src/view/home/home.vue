<!--
 vue description

 @author zhanghui
 @date 2019-11-22
 @company Dingxuan
!-->
<template>
  <div class="home">
    <Card>
      <p slot="title">
        卡片1
      </p>
      <div>
        <Row>
          <Col :xs="24" :md="16">
            <h4>访问量趋势</h4>
            <HomeTreatTotal class="height-250"/>
          </Col>
          <Col :xs="24" :md="8">
            <h4>访问量趋势</h4>
            <HomeSickTypeTotal class="height-250"/>
          </Col>
        </Row>
      </div>
    </Card>
    <Row :gutter="16" class="row">
      <Col :xs="24" :md="12">
        <Card>
          <p slot="title">
            卡片2
          </p>
          <div>
            <HomeSickTypePie/>
          </div>
        </Card>
      </Col>
      <Col :xs="24" :md="12">
        <Card>
          <p slot="title">
            卡片3
          </p>
          <div>
            <HomeDeptTotalLine/>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import HomeTreatTotal from '../../components/home-chart/home-treat-total'
import HomeSickTypeTotal from '../../components/home-chart/home-sick-type-total'
import HomeSickTypePie from '../../components/home-chart/home-sick-type-pie'
import HomeDeptTotalLine from '../../components/home-chart/home-dept-total-line'

export default {
  name: 'Home',
  components: { HomeDeptTotalLine, HomeSickTypePie, HomeSickTypeTotal, HomeTreatTotal },
  created() {
  }
}
</script>

<style lang="less">
  .home {
    .row {
      margin-top: 10px;
    }
  }
</style>
