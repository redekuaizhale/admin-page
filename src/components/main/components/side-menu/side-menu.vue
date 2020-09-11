<template>
  <div class="side-menu-wrapper">
    <slot/>
    <Menu v-show="!collapsed" ref="menu" :theme="theme" :open-names="openNames" :active-name="activeName" :accordion="accordion" @on-select="handleSelect">
      <template v-for="item in menuList">
        <template>
          <side-menu-item
            :key="`menu-${item.name}`"
            :parent-item="item"
            :icon-color="iconColor"
            :icon-size="iconSize"
          />
        </template>
      </template>
    </Menu>
    <div v-show="collapsed" :list="menuList" class="menu-collapsed">
      <template v-for="item in menuList">
        <collapsed-menu
          v-if="item.children && item.children.length > 1"
          :parent-item="item"
          :key="`drop-menu-${item.name}`"
          :icon-color="iconColor"
          :icon-size="iconSize"
          hide-title
          @on-click="handleSelect"
        />
        <Tooltip v-else :content="showTitle(item.children && item.children[0] ? item.children[0] : item)" :key="`drop-menu-${item.name}`" transfer placement="right">
          <a :style="{textAlign: 'center'}" class="drop-menu-a" @click="handleSelect(item.children[0].name)">
            <span class="i-layout-menu-side-title-icon">
                <CommonIcon :type="item.children[0].icon" :size="iconSize" :color="iconColor"/>
            </span>
          </a>
        </Tooltip>
      </template>
    </div>
  </div>
</template>
<script>
import SideMenuItem from './side-menu-item.vue'
import CollapsedMenu from './collapsed-menu.vue'
import mixin from './mixin'

export default {
  name: 'SideMenu',
  components: {
    SideMenuItem,
    CollapsedMenu
  },
  mixins: [mixin],
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      iconColor: 'rgba(255, 255, 255, 0.7)',
      iconSize: 15,
      theme: 'dark',
      accordion: true,
      activeName: '',
      openNames: []
    }
  },
  computed: {
    menuList() {
      return this.$store.state.menu.userMenuList
    }
  },
  created() {
    const { matched, name } = this.$route
    this.activeName = name
    this.openNames = [matched[0].name, matched[1].name]
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.menu.updateActiveName()
      this.$refs.menu.updateOpened()
    })
  },
  methods: {
    handleSelect(name) {
      this.$emit('turn-to-page', name)
    }
  }
}
</script>
<style lang="less">
@import './side-menu.less';
</style>
