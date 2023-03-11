<template>
  <tr
      :class="{'highLight': this.isHighLight}"
      @mouseenter="showBtn=true"
      @mouseleave="showBtn=false"
  >
    <td class="yh-table-cell" style="width: 50%">
      <p @click="play" class="song-title">{{item.name}}</p>
      <div style="display: inline-block;width: 30px;height: 100%;line-height: 100%;margin-left: 5px">
        <i class="wave" style="margin: 5px" v-show="isHighLight && isPlay"></i>
      </div>
      <span v-show="showBtn">
        <i v-show="isPlay" class="iconfont icon-zanting my-icon-btn" @click="pause"></i>
        <i v-show="!isPlay" class="iconfont icon-bofang my-icon-btn" @click="play"></i>
        <i class="iconfont icon-shanchu my-icon-btn" style="margin-left: 5px" @click="deleteMusic"></i>
      </span>
    </td>
    <td class="yh-table-cell" style="width: 20%"><p class="song-singer">{{item.singer}}</p></td>
    <td class="yh-table-cell" style="width: 30%"><p class="song-album">{{item.album}}</p></td>
  </tr>
</template>

<script>
export default {
  name: "yh-table-row",
  data() {
    return {
      showBtn:false,
    };
  },
  props:['item'],
  computed:{
    isHighLight(){
      return this.$store.state.currentMusic.src===this.item.src
    },
    isPlay(){
      return this.isHighLight?this.$store.state.isPlay:false
    }
  },
  methods:{
    play(){
      if(this.$store.state.currentMusic.src===this.item.src){
        this.$bus.$emit('playMusic')
      }
      else{
        this.$bus.$emit('changeMusic',this.item)
      }
    },
    pause(){
      this.$bus.$emit('pauseMusic')
    },
    deleteMusic(){
      this.$bus.$emit("delMusicFromLL",this.item);
      this.$bus.$emit("delMusicFromPL",this.item);
    }
  },
}
</script>

<style scoped>
  .highLight{
    background-color: #333;
    color: #31c27c;
  }

  .yh-table-cell {
    padding: 12px 5px;
    text-align: left;
    cursor: default;
  }
  .yh-table-cell p{
    display: inline-block;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
    -moz-user-select:none;/*火狐*/
    -webkit-user-select:none;/*webkit浏览器*/
    -ms-user-select:none;/*IE10*/
    -khtml-user-select:none;/*早期浏览器*/
    user-select:none;
  }

  .yh-table-cell span{
    float: right;
    margin-right: 20px;
  }

  .yh-table-cell span i{
    font-size: 20px;
  }

  .song-title {
    max-width: 280px;
  }

  .song-singer{
    max-width: 200px;
  }
  .song-album{
    max-width: 200px;
  }

</style>
