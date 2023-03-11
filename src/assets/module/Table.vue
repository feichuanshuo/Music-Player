<!--表格-->
<template>
  <div class="yh-table">
    <table>
      <thead class="yh-table-thead">
        <tr>
          <th class="yh-table-cell">歌名</th>
          <th class="yh-table-cell">歌手</th>
          <th class="yh-table-cell">专辑</th>
        </tr>
      </thead>
      <tbody v-if="tableData.length!==0" class="yh-table-tbody">
        <TableRow
            v-for="(item,index) in tableData"
            :key="index"
            :item="item"
        ></TableRow>
      </tbody>
      <tbody v-else >
        <td colspan="3">
          <div class="empty-box">
            <i class="iconfont icon-recordmachine-01"></i>
            <p>暂无音乐，快点击上方添加吧！</p>
          </div>
        </td>

      </tbody>

    </table>
  </div>
</template>

<script>
import TableRow from "./TableRow";
export default {
  name: "yh-table",
  props: ['tableData'],
  components:{
    TableRow
  }
}
</script>

<style scoped>
  .yh-table {
    width: inherit;
    padding: 5px 10px;
  }
  .yh-table table{
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    border-collapse: collapse;
  }
  .yh-table-thead{
    color: #ebebeb;
  }
  .yh-table-cell {
    padding: 12px 5px;
    text-align: left;
    color: #c3c3c5;
    font-size: 14px;
    cursor: default;
  }
  .yh-table-tbody {
    color: #ebebeb;
  }

  .yh-table-tbody tr:hover {
    background: #333;
  }

  .empty-box{
    margin: 0 auto;
    text-align: center;
    height: 300px;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .empty-box i {
    font-size: 180px;
    color: #909399;
  }
  .empty-box p{
    color: #ebebeb;
  }
</style>
