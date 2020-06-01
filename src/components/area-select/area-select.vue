<!--
 vue description

 @author zhanghui
 @date 2020-05-27
 @company Dingxuan
!-->
<template>
  <div>
    <al-cascader
      :level="level"
      v-model="value"
      :style="{'width':width+'px'}"
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
    area: {
      type: Array,
      default: Array
    },
    level: {
      type: String,
      default: '1'
    }

  },
  computed: {
    value: {
      get() {
        console.info('31312313',)
        return this.area ? this.area : []
      },
      set(value) {
        this.$emit('udpate-area', this.utils.formatArea(value))
      }
    }
  }
}
</script>

<style scoped>

</style>
