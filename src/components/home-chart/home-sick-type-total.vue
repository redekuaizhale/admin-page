<!--
 vue description

 @author zhanghui
 @date 2020-06-11
 @company Dingxuan
!-->
<template>
  <div class="HomeSickTypeTotal">
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <Row>
          <Col span="14" />
          <span>
            <Avatar :class="index < 3 ? 'rank-in':'rank-out'" size="small">{{ index + 1 }}</Avatar>
          </span>
          <span class="margin-left-8">
            {{ item.name }}
          </span>
          </Col>
          <Col span="10" class="iv-text-right" />
          {{ item.total }}
          </Col>
        </Row>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeSickTypeTotal',
  data() {
    return {
      list: [
        {
          name: '深圳-坪山区',
          total: '5144'
        },
        {
          name: '深圳-龙岗区',
          total: '4125'
        },
        {
          name: '深圳-罗湖区',
          total: '4000'
        },
        {
          name: '深圳-福田区',
          total: '3214'
        },
        {
          name: '深圳-南山区',
          total: '3110'
        },
        {
          name: '深圳-盐田区',
          total: '2145'
        },
        {
          name: '惠州',
          total: '1420'
        }
      ]
    }
  }
}
</script>

<style lang="less">
  .HomeSickTypeTotal{
    ul li{
      list-style-type: none;
      margin-top: 12px;
    }
    .rank-in{
      color: rgb(24, 144, 255);
      background-color: rgb(230, 247, 255);
    }
    .rank-out{
      color: rgb(140, 140, 140);
      background-color: rgb(245, 245, 245);
    }
  }
</style>
