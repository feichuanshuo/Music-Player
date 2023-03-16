<template>
  <div class="yh-table">
    <ul class="yh-table-header">
      <li class="yh-checkbox" v-if="showCheckbox">
        <input type="checkbox" @click="changeAllbox" v-model="isAllSelect"/>
      </li>
      <TableColumn v-for="(item,key) in columns" :key="key" :column="item"/>
    </ul>
    <ul class="yh-table-body" ref="tbodyRef">
      <li v-for="(data,index) in tableData" :key="index">
        <div class="yh-checkbox" style="display: inline-block"  v-if="showCheckbox">
          <input type="checkbox" v-model="checkboxValues[index]"/>
        </div>
        <TableCell v-for="(item,key) in columns" :key="key" :data="data[item.dataIndex]" :width="item.width">
          <slot :column="item"></slot>
        </TableCell>
      </li>
    </ul>
  </div>
</template>

<script>
import TableColumn from "./TableColumn.vue";
import TableCell from "./TableCell.vue";
export default {
  name: "TablePro",
  data(){
    return {
      isAllSelect: false,
      checkboxValues: []
    }
  },
  watch: {
    checkboxValues() {
      this.isAllSelect = this.checkboxValues.every(item => item===true)
    }
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TableColumn,
    TableCell
  },
  methods: {
    changeAllbox(e) {
      if(e.target.checked) {
        this.isAllSelect = true
        this.checkboxValues = new Array(this.tableData.length).fill(true)
      } else {
        this.isAllSelect = false
        this.checkboxValues = new Array(this.tableData.length).fill(false)
      }
    }
  },
}
</script>

<style scoped>
  .yh-table {
    padding: 5px 20px;
  }
  .yh-table-header {
    display: flex;
    list-style: none;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    height: 40px;
    position: relative;
    line-height: 40px;
  }
  .yh-checkbox {
    position: absolute;
    left: -12px;
    display: flex;
  }
  .yh-checkbox input{
    zoom: 1.2;
  }

  .yh-table-body{
    list-style: none;
    padding: 0 10px;
    position: relative;
  }
  .yh-table-body li{
    height: 40px;
    line-height: 40px;
    color: white;
  }

  .yh-table-body li:hover{
    background: #333;
  }

</style>
