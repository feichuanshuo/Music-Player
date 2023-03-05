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
      <Popover location="top" boxClass="music-play-mode">
        <template v-slot:box>
          <ul>
            <li @click="randomPlay">
              <i class="iconfont icon-suijibofang1"></i>
              随机播放
            </li>
            <li @click="orderPlay">
              <i class="iconfont icon-shunxubofang"></i>
              顺序播放
            </li>
            <li @click="singleLoop">
              <i class="iconfont icon-danquxunhuan"></i>
              单曲循环
            </li>
            <li>
              <i class="iconfont icon-liebiaoxunhuan"></i>
              列表循环
            </li>
          </ul>
        </template>
        <template v-slot:button>
          <i v-if="playMode.mode==='随机播放'" class="iconfont icon-suijibofang1 my-icon-btn" ref="musicModeRef" style="font-size: 20px;color: #ffffff;"></i>
          <i v-else-if="playMode.mode==='顺序播放'" class="iconfont icon-shunxubofang my-icon-btn" ref="musicModeRef" style="font-size: 20px;color: #ffffff;"></i>
          <i v-else-if="playMode.mode==='单曲循环'" class="iconfont icon-danquxunhuan my-icon-btn" ref="musicModeRef" style="font-size: 20px;color: #ffffff;"></i>
          <i v-else class="iconfont icon-liebiaoxunhuan my-icon-btn" ref="musicModeRef" style="font-size: 20px;color: #ffffff;"></i>
        </template>
      </Popover>
      <i class="iconfont icon-premusic music-player-icon my-icon-btn" @click="prevMusic" style="margin-left: 10px"></i>
      <i class="iconfont icon-poweroff-circle-fill music-player-playbtn" v-show="isPlay" @click="pauseMusic"></i>
      <i class="iconfont icon-play-circle-fill music-player-playbtn" v-show="!isPlay" @click="playMusic"></i>
      <i class="iconfont icon-nextmusic music-player-icon my-icon-btn" @click="nextMusic" style="margin-right: 10px"></i>
      <i class="iconfont icon-zhongdengyinliang volume-btn my-icon-btn" @click.self="showVolumeBox=!showVolumeBox">
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
      <div class="my-icon-btn" style="font-size: 16px;display: flex; align-items: center;cursor: pointer" @click="showMusicList=true">
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
                :isHighLight="currentMusic.src===music.src"
                :isPlay="currentMusic.src===music.src?isPlay:false"
            />
          </ul>
        </div>
        <div class="music-list-bottom">
          <div class="my-icon-btn" style="cursor: pointer;font-size: 16px;display: flex;align-items: center" @click="showMusicList=false">
            <i class="iconfont icon-bofangliebiao" style="font-size: 26px;"></i>
            <p>收起</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Popover from "@/assets/module/Popover.vue";
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
      currentMusicList:[],
      playMode:{
        mode:'顺序播放',
        musicList:[]
      }
    };
  },
  components:{
    MusicListItem,
    Popover
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
  // 操作音乐类
    // 设置当前音乐
    setCurrentMusic(data,musicList){
      this.$refs.audioRef.autoplay = true
      this.currentMusic = data
      window.localStorage.setItem('currentMusic',JSON.stringify(this.currentMusic))
      if (musicList){
        this.currentMusicList = musicList.slice(0)
        this.playMode.musicList = musicList.slice(0)
        if(this.playMode.mode === '顺序播放'){
          this.orderPlay()
        }
        else if(this.playMode.mode === '随机播放'){
          this.randomPlay()
        }
        else if(this.playMode.mode === '单曲循环'){
          this.singleLoop()
        }
        window.localStorage.setItem('currentMusicList',JSON.stringify(this.currentMusicList))
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
    // 从当前播放列表中删除歌曲
    deleteMusic(music){
      let index = this.currentMusicList.findIndex((item)=>item.src === music.src)
      if(index!==-1){
        this.currentMusicList.splice(index,1)
      }
      index = this.playMode.musicList.findIndex((item)=>item.src === music.src)
      if(index!==-1){
        this.playMode.musicList.splice(index,1)
      }
      if(music.src===this.currentMusic.src){
        this.nextMusic()
      }
    },
  // 播放类
    //下一首
    nextMusic(){
      const { musicList } = this.playMode
      let index = musicList.findIndex(item => item === this.currentMusic)
      if(index === musicList.length - 1){
        index = 0
      }
      else {
        index++
      }
      this.setCurrentMusic(musicList[index])
    },
    // 上一首
    prevMusic(){
      const { musicList } = this.playMode
      let index = musicList.findIndex(item => item === this.currentMusic)
      if(index === 0){
        index = musicList.length - 1
      }
      else {
        index--
      }
      this.setCurrentMusic(musicList[index])
    },
    // 单曲循环
    singleLoop(){
      this.$refs.audioRef.loop=true
      this.playMode.mode = '单曲循环'
      window.localStorage.setItem('playMode',JSON.stringify(this.playMode))
    },
    // 顺序播放
    orderPlay(){
      this.$refs.audioRef.loop=false
      this.playMode.mode = '顺序播放'
      this.playMode.musicList = this.currentMusicList.slice(0)
      window.localStorage.setItem('playMode',JSON.stringify(this.playMode))
    },
    // 随机播放
    randomPlay(){
      this.$refs.audioRef.loop=false
      this.playMode.mode = '随机播放'
      let newList = this.currentMusicList.slice(0)
      this.playMode.musicList = newList.sort(() => Math.random() - 0.5)
      window.localStorage.setItem('playMode',JSON.stringify(this.playMode))
    },
  // UI类
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
    this.$bus.$on('deleteMusic',this.deleteMusic)
    this.$refs.audioRef.addEventListener('ended',this.nextMusic)
    this.currentMusic = JSON.parse(window.localStorage.getItem('currentMusic'))
    this.currentMusicList = JSON.parse(window.localStorage.getItem('currentMusicList'))
    this.playMode = JSON.parse(window.localStorage.getItem('playMode'))
    this.$refs.audioRef.autoplay = false
  }
}
</script>

<style scoped>
  .music-player {
    height: inherit;
    width: 100%;
    background: rgba(0,0,0,0.6);;
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
    font-size: 40px!important;
    color: #31c27c!important;
    margin: 0 10px;
  }

  .music-player-end {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
  }

  .music-player-icon {
    font-size: 30px;
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

  .music-volume::after {
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


  .music-play-mode ul {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
  .music-play-mode li{
    text-align: center;
    list-style: none;
    height: 35px;
    line-height: 35px;
    font-size: 12px;
    color: #ebebeb;
    padding: 0 10px;
  }
  .music-play-mode li:hover{
    background: #35383f;
    cursor: pointer;
  }

</style>
<style>
  .music-play-mode {
    background: black;
    width: 120px!important;
    height: 150px!important;
    transform: translate(calc(-50% + 13px),-5px);
  }
  .music-play-mode::after {
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 15px solid #35383f;
    content: "";
    position: absolute;
    bottom: -13px;
    left: calc(50% - 15px);
  }

</style>
