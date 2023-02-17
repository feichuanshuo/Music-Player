<template>
  <div class="music-player">
<!--进度条-->
    <div class="music-player-progress" ref="progressRef" @click="clickProgress">
      <div class="progress-bar" ref="progressbarRef">
        <div
            class="progress-now"
        ></div>
      </div>
    </div>
    <input type="range" class="music-player-progress" v-model="rate">
<!--播放器-->
    <audio
        :src="url"
        autoplay
        ref="audioRef"
        @timeupdate="timeupdate"

    ></audio>
<!--歌曲信息-->
    <div class="music-player-start">
      <el-image
        :src = "cover"
        style = "width: 36px;height: 36px; margin: auto 10px;"
      ></el-image>
      <div>
        <p>{{name}} - {{singer}}</p>
      </div>
    </div>
<!--控制控件-->
    <div class="music-player-control">
      <i class="iconfont icon-xunhuanbofang" style="font-size: 26px;color: #ffffff;"></i>
      <i class="iconfont icon-1_music83 music-player-icon"></i>
      <i class="el-icon-video-pause" v-show="isPlay" @click="pauseMusic"></i>
      <i class="el-icon-video-play" v-show="!isPlay" @click="playMusic"></i>
      <i class="iconfont icon-1_music82 music-player-icon"></i>
      <i class="iconfont icon-zhongdengyinliang" style="font-size: 26px;color: #ffffff;"></i>
    </div>
<!--音乐列表控件-->
    <div class="music-player-end">
      <div style="padding-right: 10px;color: #ffffff">{{currentTime}} / {{duration}}</div>
      <i class="iconfont icon-bofangliebiao" style="font-size: 26px;"></i>
    </div>

  </div>
</template>

<script>
export default {
  name: "MusicPlayer",
  data() {
    return {
      isPlay: true,
      url: "http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/M5000020wJDo3cx0j3.mp3?guid=B69D8BC956E47C2B65440380380B7E9A&vkey=8FC4285D94927B7DC61696FD460343E717F641F85BE23A69ED88A6A4D993649B6247A77AFE4F2D4403C45B879CC93704BC16D7D4DD378464&uin=1828222534&fromtag=119045",
      cover: "https://y.qq.com/music/photo_new/T002R300x300M000002Neh8l0uciQZ_1.jpg",
      name: "稻香",
      singer: "周杰伦",
      currentTime: "00:00",
      duration: "00:00",
      rate:"0"
    };
  },
  methods: {
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
      this.currentTime = this.s_to_ms(this.$refs.audioRef.currentTime)
      this.duration = this.s_to_ms(this.$refs.audioRef.duration)
      this.rate = this.$refs.audioRef.currentTime / this.$refs.audioRef.duration * 100
      this.$refs.progressbarRef.style.width = this.$refs.audioRef.currentTime / this.$refs.audioRef.duration * 100 + '%'
    },
    // 拖动进度条
    changeProgress(){
      this.$refs.audioRef.currentTime = this.rate / 100 * this.$refs.audioRef.duration
    },
    // 点击进度条改变进度
    clickProgress(e){
      let progress = this.$refs.progressRef
      let progressbar = this.$refs.progressbarRef
      let rate = (e.clientX - progress.getBoundingClientRect().left) / progress.offsetWidth
      progressbar.style.width = rate * 100 + '%'
      this.$refs.audioRef.currentTime = rate * this.$refs.audioRef.duration
    },

    //秒转分秒
    s_to_ms(time){
      let m = Math.floor(time / 60)
      let s = Math.floor(time % 60)
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      return m + ':' + s
    }
  },
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

  .progress-now {
    background: #000000;
    height:10px;
    width: 10px;
    border-radius: 50%;
    right: -4px;
    top: -3px;
    position: absolute;
  }

</style>
