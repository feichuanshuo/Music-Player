<template>
  <div id="localMusicPage">
    <header class="page-title">本地音乐</header>
    <div class="page-list">
      <el-table
          :data="musicList"
          style="width: 100%;background: inherit"
          :header-cell-style="{ background: 'rgba(84,92,100,0.0)', color: '#c3c3c5',border: 'none' }"
          :header-row-style="{ background: 'rgba(84,92,100,0.0)'}"
          :row-style="{ background: 'rgba(84,92,100,0.0)' , color: '#fff' , border: '0'}"
          :cell-style="{border: 'none'}"
      >
        <el-table-column
            label="歌名"
            width="180"
        >
          <template v-slot="data">
            <span @dblclick="changeMusic(data.row)" class="song-title">{{data.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="歌手"
            width="180">
          <template v-slot="data">
            <span class="song-title">{{data.row.singer}}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="专辑">
          <template v-slot="data">
            <span class="song-title">{{data.row.album}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
const { fs,jsmediatags,iconv } = window
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
      this.$bus.$emit('setCurrentMusic',data,this.musicList)
    }
  },
  mounted() {
    let musicList = [];
    fs.readdir('F:\\MUSIC', (err, data) => {
      if (err) return console.error(err);
      for (let i = 0; i < data.length; i++) {
        let musicpath = 'F:\\MUSIC\\' + data[i];
        jsmediatags.read(musicpath, {
          onSuccess: function(song) {
            let {tags} = song
            let musicMessage = {
              name: tags.title?tags.title:data[i].split('.')[0],
              singer: tags.artist,
              album: tags.album,
              src: musicpath
            };
            musicList.push(musicMessage);
          },
          onError: function(error) {
            console.log(':(', error.type, error.info);
          }
        });
      }
    });
    this.musicList = musicList;
  }
}
</script>

<style>
  #localMusicPage {
    background: inherit;
  }


  .page-title {
    font-size: 30px;
    color: #ffffff;
    font-weight: 600;
    padding: 20px 0;
  }

  .page-list {
    padding: 10px;
  }
  .song-title {
    cursor: pointer;
    color: #ffffff;
    -moz-user-select:none;/*火狐*/
    -webkit-user-select:none;/*webkit浏览器*/
    -ms-user-select:none;/*IE10*/
    -khtml-user-select:none;/*早期浏览器*/
    user-select:none;
  }
  .el-table tbody tr:hover>td {
    background-color: rgba(84,92,100,0.7) !important
  }
  .el-table--border::after, .el-table--group::after, .el-table::before {
    background: none;
  }
</style>
