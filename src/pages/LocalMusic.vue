<template>
  <div>
    <el-table
        :data="musicList"
        style="width: 100%"
    >
      <el-table-column
          label="歌名"
          width="180"
      >
        <template v-slot="data">
            <span @dblclick="changeMusic(data.row)">{{data.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="singer"
          label="歌手"
          width="180">
      </el-table-column>
      <el-table-column
          prop="album"
          label="专辑">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const { NodeID3,fs } = window
export default {
  name: "LocalMusic",
  data() {
    return {
      musicList: [{
        name: '稻香',
        singer: '周杰伦',
        album: '七里香',
        src: 'F:\\MUSIC\\Baby.mp3'}]
    }
  },
  methods:{
    changeMusic(data){
      this.$bus.$emit('setCurrentMusic',data)
    }
  },
  mounted() {
    let musicList = [];
    fs.readdir('F:\\MUSIC', (err, data) => {
      if (err) return console.error(err);
      for (let i = 0; i < data.length; i++) {
        let musicpath = 'F:\\MUSIC\\' + data[i];
        NodeID3.read(musicpath, (err, tags) => {
          if (err) return console.error(err);
          let musicMessage = {
            name: tags.title,
            singer: tags.artist,
            album: tags.album,
            src: musicpath
          };
          musicList.push(musicMessage);
        })
      }
    });
    this.musicList = musicList;
  }
}
</script>

<style scoped>

</style>
