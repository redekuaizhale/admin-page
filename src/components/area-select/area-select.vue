<!--
 vue description

 @author zhanghui
 @date 2020-05-27
 @company Dingxuan
!-->
<template>
  <div>
    <Cascader v-model="currentValue" :data="areaOptions" @on-change="areaChangeHandle" />
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
import { arrayIsEmpty } from '../../libs/commonUtils'
export default {
  name: 'AreaSelect',
  props: {
    level: {
      type: String,
      default: '2'
    },
    value: {
      type: Array,
      default: Array
    }
  },
  data() {
    return {
      currentValue: this.value,
      areaOptions: regionData
    }
  },
  watch: {
    value(val) {
      this.setCurrentValue(val)
    }
  },
  methods: {
    setCurrentValue(value) {
      console.info('value', value)
      this.value = value
    },
    areaChangeHandle(value, selectData) {
      const arr = []
      if (!arrayIsEmpty(selectData)) {
        selectData.map(item => {
          arr.push(item.value)
        })
      }
      this.$emit('input', arr)
      this.$emit('on-change', arr)
    }
  }
}
</script>

<style scoped>

</style>
