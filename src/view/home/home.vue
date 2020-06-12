<!--
 vue description

 @author zhanghui
 @date 2019-11-22
 @company Dingxuan
!-->
<template>
  <div class="Home">
    <Card>
      <p slot="title">
        <AvatorIcon :size="15" type="_barchart"/>
        测试
      </p>
      <div>
        <Row>
          <Col :xs="24" :md="16">
          <h4 id="h4">访问量趋势</h4>
          <HomeTreatTotal class="card-body"/>
          </Col>
          <Col :xs="24" :md="8">
          <h4>访问量趋势</h4>
          <HomeSickTypeTotal class="card-body"/>
          </Col>
        </Row>
      </div>
    </Card>
  </div>
</template>

<script>
import HomeTreatTotal from '../../components/home-chart/home-treat-total'
import HomeSickTypeTotal from '../../components/home-chart/home-sick-type-total'
import CommonIcon from '../../components/common-icon/common-icon'
import AvatorIcon from '../../components/avator-icon/avator-icon'
export default {
  name: 'Home',
  components: { AvatorIcon, CommonIcon, HomeSickTypeTotal, HomeTreatTotal }
}
</script>

<style lang="less">
  .Home{
    .card-body{
      height: 240px;
    }
  }

</style>
