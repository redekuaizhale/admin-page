<!--
 vue description

 @author zhanghui
 @date 2020-06-12
 @company Dingxuan
!-->
<template>
  <div class="AvatorIcon">
    <Avatar :size="avSize" >
      <CommonIcon :type="type" :color="color" :size="size"/>
    </Avatar>
  </div>
</template>

<script>
import CommonIcon from '../common-icon/common-icon'
export default {
  name: 'AvatorIcon',
  components: { CommonIcon },
  props: {
    type: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 14
    },
    avSize: {
      type: String,
      default: 'small'
    }
  }
}
</script>

<style lang="less">
.AvatorIcon{
  display: inline;
  .ivu-avatar{
    color: rgb(24, 144, 255);
    background-color: rgb(230, 247, 255);
  }
}
</style>
