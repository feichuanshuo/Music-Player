<template>
  <div class="yh-table-cell" :style="cellStyle" :title="data">
    <slot></slot>
    <p>{{data}}</p>
  </div>
</template>

<script>
export default {
  name: "TableCell",
  props: {
    data: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  computed: {
    cellStyle() {
      return {
        width: this.width,
        'font-size': '16px'
      }
    }
  }
}
</script>

<style scoped>
  .yh-table-cell {
    display: inline-block;
    overflow: hidden;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
