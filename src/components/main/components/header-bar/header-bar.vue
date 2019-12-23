<template>
  <div class="header-bar">
    <sider-trigger
      :collapsed="collapsed"
      icon="md-menu"
      @on-change="handleCollpasedChange"
    />
    <custom-bread-crumb
      :list="breadCrumbList"
      show-icon
      style="margin-left: 30px;"
    />
    <div class="custom-content-con">
      <slot />
    </div>
  </div>
</template>
<script>
import siderTrigger from './sider-trigger'
import customBreadCrumb from './custom-bread-crumb'
import './header-bar.less'
export default {
  name: 'HeaderBar',
  components: {
    siderTrigger,
    customBreadCrumb
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    breadCrumbList() {
      return this.$store.state.app.breadCrumbList
    }
  },
  methods: {
    handleCollpasedChange(state) {
      this.$emit('on-coll-change', state)
    }
  }
}
</script>
