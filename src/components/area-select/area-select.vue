<!--
 vue description

 @author zhanghui
 @date 2020-05-27
 @company Dingxuan
!-->
<template>
  <div class="area-select">
    <Cascader v-model="currentValue" :disabled="disabled" :data="areaOptions" @on-change="areaChangeHandle" />
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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentValue: this.value,
      areaOptions: regionData
    }
  },
  watch: {
    value(value) {
      this.setCurrentValue(value)
    }
  },
  methods: {
    setCurrentValue(value) {
      this.currentValue = value
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

<style lang="less">
  .area-select{
    .ivu-input[disabled], fieldset[disabled] .ivu-input{
      color: #515a6e;
      background-color: transparent;
    }
  }
</style>
