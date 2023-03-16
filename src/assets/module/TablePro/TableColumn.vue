<template>
  <li :style="liStyle">{{column.title}}</li>
</template>

<script>
export default {
  name: "TableColumn",
  props: {
    column: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    liStyle() {
      return {
        color: '#c3c3c5',
        width: this.column.width,
        'font-size': '14px',
        cursor: 'default',
        'font-weight': 'bold'
      }
    }
  }
}
</script>

<style scoped>

</style>
