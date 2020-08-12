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
        测试
      </p>
      <div>
        <Row>
          <Col :xs="24" :md="16">
          <h4>访问量趋势</h4>
          <homeTreatTotal class="height-250"/>
          </Col>
          <Col :xs="24" :md="8">
          <h4>访问量趋势</h4>
          <homeSickTypeTotal class="height-250"/>
          </Col>
        </Row>
      </div>
    </Card>

    <Row class="row">
      <Col :xs="24" :md="12">
      <Card>
        <p slot="title">
          标签1
        </p>
        <div>
          <homeSickTypePie/>
        </div>
      </Card>
      </Col>
      <Col :xs="24" :md="12">
      </Col>
    </Row>
  </div>
</template>

<script>
import homeTreatTotal from '../../components/home-chart/home-treat-total'
import homeSickTypeTotal from '../../components/home-chart/home-sick-type-total'
import AvatorIcon from '../../components/avator-icon/avator-icon'
import homeSickTypePie from '../../components/home-chart/home-sick-type-pie'
export default {
  name: 'Home',
  components: { homeSickTypePie, AvatorIcon, homeSickTypeTotal, homeTreatTotal }
}
</script>

<style lang="less">
  .home{
    .row{
      margin-top: 10px;
    }
  }
</style>
