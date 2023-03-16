<template>
  <div>
    <header class="page-title">最近播放</header>
    <div class="page-content">
      <button @click="showCheckbox=true">批量操作</button>
      <button @click="showCheckbox=false">取消批量操作</button>
      <TablePro :columns="columns" :table-data="musicList" :showCheckbox="showCheckbox">
        <template v-slot:default="column">
          <span v-if="column.column.dataIndex==='name'" class="music-list-menu">
            <i class="iconfont icon-zanting my-icon-btn"></i>
            <i class="iconfont icon-bofang my-icon-btn"></i>
            <i class="iconfont icon-shanchu my-icon-btn" style="margin-left: 5px"></i>
          </span>
        </template>
      </TablePro>
    </div>
  </div>
</template>

<script>
import TablePro from "@/assets/module/TablePro/TablePro.vue";
export default {
  name: "RecentMusic",
  data(){
    return {
      // 列表配置项
      columns: [
        {
          title: '歌名',
          dataIndex: 'name',
          width: '50%'
        },
        {
          title: '歌手',
          dataIndex: 'singer',
          width: '25%'
        },
        {
          title: '专辑',
          dataIndex: 'album',
          width: '25%'
        }
      ],

      // 本地音乐列表
      musicList: [],

      // 是否批量操作
      showCheckbox: false
    }
  },
  components: {
    TablePro
  },
  mounted() {
    this.musicList = JSON.parse(window.localStorage.getItem('localMusicList')) || []
  }
}
</script>

<style>
  .music-list-menu {
    float: right;
    margin-right: 20px;
  }
  .yh-table-body li .music-list-menu{
    display: none;
  }

  .yh-table-body li:hover .music-list-menu{
    display: block;
  }

</style>
