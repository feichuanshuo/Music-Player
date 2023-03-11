<template>
  <div>
    <header class="page-title">最近播放</header>
    <div class="page-content">
      <Table :table-data="musicList"></Table>
    </div>
  </div>
</template>

<script>
import Table from '@/assets/module/Table.vue'
export default {
  name: "RecentMusic",
  data(){
    return {
      // 本地音乐列表
      musicList: [],
    }
  },
  components: {
    Table
  },
  mounted() {
    this.musicList = JSON.parse(window.localStorage.getItem('localMusicList')) || []
    console.log(this.musicList)
  }
}
</script>

<style scoped>

</style>
