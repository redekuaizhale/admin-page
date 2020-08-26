<!--
 vue description

 @author zhanghui
 @date 2020-05-27
 @company Dingxuan
!-->
<template>
  <div>
    <Input
      v-model="currentValue"
      maxlength="2000"
      show-word-limit
      type="textarea"
      placeholder=" "
      @input="handleInput"
    />
    </Input>
  </div>
</template>

<script>
export default {
  name: 'Textarea',
  props: {
    content: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
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
      this.setCurrentValue(val)
    }
  },
  methods: {
    setCurrentValue(value) {
      this.currentValue = value
    },
    handleInput(value) {
      this.$emit('input', value)
      this.$emit('on-change', value)
    }
  }
}
</script>

<style scoped>

</style>
