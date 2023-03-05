<template>
  <li
      :class="{'item-li':!isHighLight,'highlight':isHighLight}"
      @mouseenter="showBtn=true"
      @mouseleave="showBtn=false"
      ref="liRef"
  >
    <div style="width: 215px;margin-right: 5px;">
      <div class="song-name">
        <p>{{music.name}}</p>
        <i class="wave" v-show="isHighLight && isPlay"></i>
      </div>
      <p class="song-singer">{{music.singer}}</p>
    </div>
    <div v-show="showBtn">
      <i v-show="!isPlay" class="iconfont icon-bofang my-icon-btn" @click="play"></i>
      <i v-show="isPlay" class="iconfont icon-zanting my-icon-btn" @click="pause"></i>
      <i class="iconfont icon-shanchu my-icon-btn" style="margin-left: 5px" @click="deleteMusic"></i>
    </div>
  </li>
</template>

<script>
export default {
  name: "MusicListItem",
  data(){
    return {
      showBtn:false,
    }
  },
  props:['music','playMusic','pauseMusic','isHighLight',"isPlay"],
  methods:{
    play(){
      if(this.isHighLight){
        this.playMusic()
      }
      else{
        this.$bus.$emit('setCurrentMusic',this.music)
      }
    },
    pause(){
      this.pauseMusic()
    },
    deleteMusic(){
      this.$bus.$emit('deleteMusic',this.music)
    }
  },
  updated() {
    if (this.isHighLight) {
      this.$refs.liRef.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      })
    }
  },
  mounted() {
    if (this.isHighLight) {
      this.$refs.liRef.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      })
    }
  }
}
</script>

<style scoped>
  .item-li:hover,.highlight {
    background: #353535;
  }

  .highlight {
    color: #31c27c!important;
  }
  .song-name  {
    display: flex;
    align-items: center;
  }
  .song-name p {
    width: 150px;
    font-size: 14px;
    margin-right: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
  .song-singer  {
    font-size: 10px;
    margin-top: 5px;
  }

</style>
