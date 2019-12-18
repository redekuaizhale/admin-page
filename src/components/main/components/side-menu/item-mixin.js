export default {
  props: {
    parentItem: {
      type: Object,
      default: () => {}
    },
    theme: {
      type: String,
      default: ''
    },
    iconSize: {
      type: Number,
      default: 0
    },
    iconColor: {
      type: String,
      default: ''
    }
  },
  computed: {
    parentName() {
      return this.parentItem.name
    },
    children() {
      return this.parentItem.children
    }
  }
}
