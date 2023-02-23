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
      <i class="iconfont icon-xunhuanbofang" style="font-size: 26px;color: #ffffff;"></i>
      <i class="iconfont icon-1_music83 music-player-icon"></i>
      <i class="el-icon-video-pause" v-show="isPlay" @click="pauseMusic"></i>
      <i class="el-icon-video-play" v-show="!isPlay" @click="playMusic"></i>
      <i class="iconfont icon-1_music82 music-player-icon"></i>
      <i class="iconfont icon-zhongdengyinliang volume-btn" @click.self="showVolumeBox=!showVolumeBox">
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
      <i class="iconfont icon-bofangliebiao" style="font-size: 26px;"></i>
    </div>
    <div class="music-list">

    </div>
  </div>
</template>

<script>
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
      showVolumeBox: false
    };
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
    setCurrentMusic(data){
      this.currentMusic = data
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
    }
  },
  mounted() {
    this.$bus.$on('setCurrentMusic',this.setCurrentMusic)
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
    font-size: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
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
    background: #15c21d;
    height: inherit;
    width: 0;
    position: relative;
  }

  .progress-btn {
    background: #000000;
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

</style>
