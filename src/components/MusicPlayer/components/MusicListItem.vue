<template>
  <li
      class="item-li"
      @mouseenter="showBtn=true"
      @mouseleave="showBtn=false"
      ref="liRef"
  >
    <div style="width: 80%">
      <p class="song-name">{{music.name}}</p>
      <p class="song-singer">{{music.singer}}</p>
    </div>
    <div v-show="showBtn">
      <i v-show="!isPlay" class="iconfont icon-bofang" @click="play"></i>
      <i v-show="isPlay" class="iconfont icon-zanting" @click="pause"></i>
    </div>
  </li>
</template>

<script>
export default {
  name: "MusicListItem",
  data(){
    return {
      showBtn:false,
      isPlay: false,
    }
  },
  watch: {
    isHighLight:{
      handler(newValue){
        if(newValue) {
          this.$refs.liRef.className = 'highlight'
          this.isPlay = true
        }
        else {
          this.$refs.liRef.className = 'item-li'
          this.isPlay = false
        }
      }
    }
  },
  props:['music','playMusic','pauseMusic','isHighLight'],
  methods:{
    play(){
      if(this.isHighLight){
        this.playMusic()
      }
      else{
        this.$bus.$emit('setCurrentMusic',this.music)
      }
      this.isPlay=true
    },
    pause(){
      this.isPlay=false,
      this.pauseMusic()
    }
  }
}
</script>

<style scoped>
  .item-li:hover,.highlight {
    background: #353535;
  }
  .song-name  {
    font-size: 16px;
  }
  .song-singer  {
    font-size: 10px;
    margin-top: 5px;
  }
</style>
