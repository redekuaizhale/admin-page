<!--
 vue description

 @author zhanghui
 @date 2020-05-27
 @company Dingxuan
!-->
<template>
  <div>
    <al-cascader
      v-if="modalVisiable"
      :level="level"
      v-model="value"
      :style="{'width':width+'px'}"
      data-type="name"
      @on-change="areaChangeHandle"
    />
  </div>
</template>

<script>
export default {
  name: 'AreaSelect',
  props: {
    width: {
      type: Number,
      default: 200
    },
    level: {
      type: String,
      default: '1'
    },
    modalVisiable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      value: []
    }
  },
  methods: {
    setDefaultValue(value) {
      this.value = value
    },
    areaChangeHandle(value) {
      this.$emit('udpate-area', value ? value.toString().replace(',', '/') : '')
    }
  }
}
</script>

<style scoped>

</style>
