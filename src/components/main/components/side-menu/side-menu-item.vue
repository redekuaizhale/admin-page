<template>
  <Submenu :name="`${parentName}`">
    <template slot="title">
      <span class="i-layout-menu-side-title-icon">
        <CommonIcon :type="parentItem.icon || ''" :size="iconSize" :color="iconColor"/>
      </span>
      <span>
        {{ showTitle(parentItem) }}
      </span>
    </template>
    <template v-for="item in children">
      <template v-if="item.children && item.children.length === 1">
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"/>
        <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`">
          <span class="i-layout-menu-side-title-icon">
            <CommonIcon :type="item.children[0].icon || ''" :size="iconSize" :color="iconColor"/>
          </span>
          <span>
            {{ item.title + item.name }}
          </span>
        </menu-item>
      </template>
      <template v-else>
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"/>
        <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`">
          <span class="i-layout-menu-side-title-icon">
            <CommonIcon :type="item.icon" :size="iconSize" :color="iconColor"/>
          </span>
          <span>
            {{ showTitle(item) }}
          </span>
        </menu-item>
      </template>
    </template>
  </Submenu>
</template>
<script>
import mixin from './mixin'
import itemMixin from './item-mixin'

export default {
  name: 'SideMenuItem',
  mixins: [mixin, itemMixin]
}
</script>
