<template>
  <div class="custom-bread-crumb">
    <Breadcrumb :style="{fontSize: `${fontSize}px`}">
      <BreadcrumbItem v-for="item in list" :key="`bread-crumb-${item.title}`">
        <CommonIcon :type="item.icon || ''" style="margin-right: 4px;"/>
        {{ item.title }}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script>
import './custom-bread-crumb.less'
export default {
  name: 'CustomBreadCrumb',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    fontSize: {
      type: Number,
      default: 14
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  }
}
</script>
