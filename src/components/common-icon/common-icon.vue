<template>
  <svg class="icon" :style="style" aria-hidden="true" @click="handleClick">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'CommonIcon',
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
      default: 0
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.type}`
    },
    style() {
      const fill = this.color ? this.color : 'currentColor'
      const size = this.size ? (this.size + 'px') : '1em'
      return { fill: fill, width: size, height: size }
    }
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style scoped>
  .icon {
    vertical-align: -0.15em;
    overflow: hidden;
  }
</style>
