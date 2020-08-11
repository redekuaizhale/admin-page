<!--
 vue description

 @author zhanghui
 @date 2020-08-11
 @company Dingxuan
!-->
<template>
  <DatePicker v-model="currentValue" :type="type" :options="options" :format="format" placeholder=" " @on-change="handleChange"/>
</template>

<script>
export default {
  name: 'DateCustom',
  props: {
    type: {
      type: String,
      default: 'date'
    },
    options: {
      type: Object,
      default: Object
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    },
    value: {
      type: [String, Date],
      default: ''
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value(val) {
      this.setCurrentValue(this.dateUtils.formatDate(val))
    }
  },
  methods: {
    setCurrentValue(value) {
      this.currentValue = value
    },
    handleChange(value) {
      const format = this.dateUtils.formatDate(value)
      this.$emit('input', format)
      this.$emit('on-change', format)
    }
  }
}
</script>

<style scoped>

</style>
