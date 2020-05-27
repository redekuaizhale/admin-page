<!--
 vue description

 @author zhanghui
 @date 2020-05-27
 @company Dingxuan
!-->
<template>
  <div>
    <Input
      v-model="value"
      :style="{'width':width+'px'}"
      maxlength="2000"
      show-word-limit
      type="textarea"
      placeholder=" "
    >
    </Input>
  </div>
</template>

<script>
export default {
  name: 'Textarea',
  props: {
    width: {
      type: Number,
      default: 200
    },
    content: {
      type: String,
      default: ''
    }
  },
  computed: {
    value: {
      get() {
        return this.content
      },
      set(value) {
        this.$emit('update-textarea', value)
      }
    }
  }
}
</script>

<style scoped>

</style>
