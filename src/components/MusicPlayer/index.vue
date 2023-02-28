<template>
  <div class="music-player">
<!--进度条-->
    <div class="music-player-progress" ref="progressRef" @mousedown.stop="progressDown" @mouseover="showBtn=true" @mouseleave="showBtn=false">
      <div class="progress-bar" ref="progressbarRef" >
        <div
            class="progress-btn"
            @mousedown="btnDown"
            v-show="showBtn"
        ></div>
      </div>
    </div>
<!--播放器-->
    <audio
        :src="currentMusic.src"
        autoplay
        ref="audioRef"
        @timeupdate="timeupdate"
    >
    </audio>
<!--歌曲信息-->
    <div class="music-player-start">
      <el-image
        :src = "cover"
        style = "width: 36px;height: 36px; margin: auto 10px;"
      ></el-image>
      <div>
        <p>{{currentMusic.name}} - {{currentMusic.singer}}</p>
      </div>
    </div>
<!--控制控件-->
    <div class="music-player-control">
      <el-popover
          placement="top"
          width="400"
          trigger="click">
        <div>dsdsd</div>
        <i class="iconfont icon-suijibofang1" style="font-size: 26px;color: #ffffff;" slot="reference"></i>
      </el-popover>
      <i class="iconfont icon-1_music83 music-player-icon my-btn" @click="prevMusic"></i>
      <i class="iconfont icon-poweroff-circle-fill music-player-playbtn" v-show="isPlay" @click="pauseMusic"></i>
      <i class="iconfont icon-play-circle-fill music-player-playbtn" v-show="!isPlay" @click="playMusic"></i>
      <i class="iconfont icon-1_music82 music-player-icon my-btn" @click="nextMusic"></i>
      <i class="iconfont icon-zhongdengyinliang volume-btn my-btn" @click.self="showVolumeBox=!showVolumeBox">
          <div class="music-volume" v-if="showVolumeBox">
            <div class="volume-slider">
              <el-slider
                  v-model="volume"
                  vertical
                  @input="volumeChange"
                  height="120px">
              </el-slider>
            </div>
            <div class="mute-btn">
              <i v-if="!isMute" class="iconfont icon-zhongdengyinliang" @click="mute"></i>
              <i v-else class="iconfont icon-guanbishengyin" @click="cancelMute"></i>
            </div>
          </div>
      </i>
    </div>
<!--音乐列表控件-->
    <div class="music-player-end">
      <div style="padding-right: 10px;color: #ffffff">{{currentTime}} / {{duration}}</div>
      <div class="my-btn" style="font-size: 16px;display: flex; align-items: center;cursor: pointer" @click="showMusicList=true">
        <i class="iconfont icon-bofangliebiao" style="font-size: 26px;"></i>
        <p>{{currentMusicList.length}}</p>
      </div>
    </div>
<!--正在播放的音乐列表-->
    <transition name="musicList" appear>
      <div class="music-list" v-show="showMusicList">
        <div class="music-list-top">
          <div style="font-size: 20px;vertical-align:bottom;">
            播放队列
          <div/>
          <div style="font-size: 10px; color: #7a7c85;margin-top: 10px">
            {{currentMusicList.length}}首歌曲
          </div>
        </div>
        </div>
        <div class="music-list-content">
          <ul>
            <MusicListItem
                v-for="(music,index) in currentMusicList"
                :key="index"
                :music="music"
                :playMusic="playMusic"
                :pauseMusic="pauseMusic"
                :isHighLight="music===currentMusic"
            />
          </ul>
        </div>
        <div class="music-list-bottom">
          <div class="my-btn" style="cursor: pointer;font-size: 16px;display: flex;align-items: center" @click="showMusicList=false">
            <i class="iconfont icon-bofangliebiao" style="font-size: 26px;"></i>
            <p>收起</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import MusicListItem from "@/components/MusicPlayer/components/MusicListItem.vue";
export default {
  name: "MusicPlayer",
  data() {
    return {
      currentMusic:{},
      isPlay: false,
      cover: "https://y.qq.com/music/photo_new/T002R300x300M000002Neh8l0uciQZ_1.jpg",
      volume: 100,
      currentTime: "00:00",
      duration: "00:00",
      isDraging: false,
      showBtn: false,
      isMute: false,
      showVolumeBox: false,
      showMusicList:false,
      currentMusicList:[]
    };
  },
  components:{
    MusicListItem
  },
  watch: {
    volume(){
      if(this.volume === 0){
        this.isMute = true
      }
      else {
        this.isMute = false
      }
    }
  },
  methods: {
    // 设置当前音乐
    setCurrentMusic(data,musicList){
      this.currentMusic = data
      if (musicList){
        this.currentMusicList = musicList
      }
      this.isPlay = true
    },

    // 播放音乐
    playMusic(){
      this.isPlay = true
      this.$refs.audioRef.play()
    },
    // 暂停音乐
    pauseMusic(){
      this.isPlay = false
      this.$refs.audioRef.pause()
    },

    //下一首
    nextMusic(){
      let index = this.currentMusicList.findIndex(item => item === this.currentMusic)
      if(index === this.currentMusicList.length - 1){
        index = 0
      }
      else {
        index++
      }
      this.setCurrentMusic(this.currentMusicList[index])
    },
    // 上一首
    prevMusic(){
      let index = this.currentMusicList.findIndex(item => item === this.currentMusic)
      if(index === 0){
        index = this.currentMusicList.length - 1
      }
      else {
        index--
      }
      this.setCurrentMusic(this.currentMusicList[index])
    },


    // 更新歌曲时间
    timeupdate(){
      if(this.isDraging) return
      this.currentTime = this.s_to_ms(this.$refs.audioRef.currentTime)
      this.duration = this.s_to_ms(this.$refs.audioRef.duration)
      this.$refs.progressbarRef.style.width = this.$refs.audioRef.currentTime / this.$refs.audioRef.duration * 100 + '%'
    },
    // 控制按钮按下
    btnDown(){
      this.isDraging = true
      document.addEventListener('mousemove', this.changeProgress)
      document.addEventListener('mouseup', this.btnUp)
    },
    // 进度条按下
    progressDown(e){
      this.isDraging = true
      let rate = (e.clientX - this.$refs.progressRef.getBoundingClientRect().left) / this.$refs.progressRef.offsetWidth
      this.$refs.progressbarRef.style.width = rate * 100 + '%'
      document.addEventListener('mousemove', this.changeProgress)
      document.addEventListener('mouseup', this.btnUp)
    },

    // 拖动进度条
    changeProgress(e){
      let rate = (e.clientX - this.$refs.progressRef.getBoundingClientRect().left) / this.$refs.progressRef.offsetWidth
      this.$refs.progressbarRef.style.width = rate * 100 + '%'
    },

    // 控制按钮弹起
    btnUp(e){
      let rate = (e.clientX - this.$refs.progressRef.getBoundingClientRect().left) / this.$refs.progressRef.offsetWidth
      this.$refs.audioRef.currentTime = rate * this.$refs.audioRef.duration
      document.removeEventListener('mousemove', this.changeProgress)
      document.removeEventListener('mouseup', this.btnUp)
      this.isDraging = false
    },

    //秒转分秒
    s_to_ms(time) {
      let m = Math.floor(time / 60)
      let s = Math.floor(time % 60)
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      return m + ':' + s
    },

    // 音量控制
    volumeChange(){
      this.$refs.audioRef.volume = this.volume / 100
    },

    // 静音
    mute(){
      this.isMute = true
      this.$refs.audioRef.muted = true
    },

    // 取消静音
    cancelMute(){
      this.isMute = false
      this.$refs.audioRef.muted = false
    },

  },
  mounted() {
    this.$bus.$on('setCurrentMusic',this.setCurrentMusic)
    this.$refs.audioRef.addEventListener('ended',this.nextMusic)
  }
}
</script>

<style scoped>
  .music-player {
    height: inherit;
    width: 100%;
    background-color: #545c64;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .music-player-start {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    padding-left: 20px;
  }

  .music-player-control {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  .music-player-playbtn {
    font-size: 50px!important;
    color: #31c27c!important;
  }

  .music-player-end {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
  }

  .music-player-icon {
    font-size: 40px;
    color: white;
  }

  .music-player-start p {
    color: white;
    font-size: 10px;
  }

  .music-player-progress {
    background: #ebebeb;
    width: 100%;
    height: 4px;
  }

  .progress-bar {
    background: #31c27c;
    height: inherit;
    width: 0;
    position: relative;
  }

  .progress-btn {
    background: #31c27c;
    height:10px;
    width: 10px;
    border-radius: 50%;
    right: -10px;
    top: -3px;
    position: absolute;
  }
  .volume-btn {
    font-size: 26px;
    color: #ffffff;
    position: relative;
    justify-content: center
  }
  .music-volume {
    display: flex;
    position: absolute;
    flex-flow: column;
    justify-content: center;
    top:-225px;
    left: -17px;
    width: 50px;
    height: 200px;
    background: #35383f;
    padding: 5px;
    border-radius: 10px;
  }

  .music-volume:after {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #35383f;
    content: "";
    position: absolute;
    bottom: -8px;
    left: 20px
  }

  .volume-slider {
    padding: 10px 0;
    border-bottom: black solid 1px;
    height: 120px;
    display: flex;
    justify-content: center;
  }

  .mute-btn {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }

  .mute-btn i {
    font-size: 26px;
    color: #ffffff;
  }

  .music-list {
    position: fixed;
    width: 300px;
    height: 100%;
    background: black;
    right: 0;
    top: 0;
  }

  .musicList-enter-active{
    animation: showAside 0.2s linear;
  }

  .musicList-leave-active{
    animation: showAside 0.2s linear reverse;
  }

  @keyframes showAside {
    from{
      right: -300px;
    }
    to{
      right: 0;
    }
  }

  .music-list-top {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100px;
    background: rgba(84,92,100,0.7);
    box-sizing: border-box;
    padding: 20px;
    color: #ffffff;
  }

  .music-list-content {
    position: absolute;
    top:100px;
    bottom: 60px;
    background: rgba(84,92,100,0.7);
    width: 100%;
    overflow: auto;
  }

  .music-list-content li{
    list-style-type: none;
    color: #ebebeb;
    box-sizing: border-box;
    padding: 0 20px;
    height: 60px;
    display: flex;
    align-items: center;
  }

  .music-list-bottom {
    height: 60px;
    width: 100%;
    position: absolute;
    bottom: 0;
    background: rgba(84,92,100,0.7);
    border-top: #c4c4c4 1px solid;
  }

  .music-list-bottom>div {
    padding:4px 20px 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  /*整个滚动条*/
  .music-list-content::-webkit-scrollbar{
    width:10px;
    height:10px;
  }
  /*滚动条轨道*/
  .music-list-content::-webkit-scrollbar-track{
    opacity: 0;
    border-radius:2px;
  }
  /*滚动条滑块*/
  .music-list-content::-webkit-scrollbar-thumb{
    background: #333;
    border-radius:10px;
  }
  /*滚动条滑块:hover*/
  .music-list-content::-webkit-scrollbar-thumb:hover{
    background: #bfbfbf;
  }
  /*当同时有垂直滚动条和水平滚动条时交汇的部分。通常是浏览器窗口的右下角。*/
  .music-list-content::-webkit-scrollbar-corner{
    background: #31c27c;
  }


</style>
