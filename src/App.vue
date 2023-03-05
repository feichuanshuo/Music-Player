<template>
  <div id="app">
    <el-container class="music-container">
      <el-aside class="music-asider" width="200px">
        <HomepageMenu/>
      </el-aside>
      <el-container>
        <el-header class="music-header">
          <HomepageHeader/>
        </el-header>
        <el-main class="music-main">
          <HomepageContent/>
        </el-main>
        <el-footer class="music-footer">
          <MusicPlayer/>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomepageMenu from "./components/HomepageMenu.vue"
import HomepageHeader from "./components/HomepageHeader.vue";
import HomepageContent from "./components/HomepageContent.vue"
import MusicPlayer from "@/components/MusicPlayer/index.vue";
export default {
  name: 'App',
  components: {
    HomepageMenu,
    HomepageContent,
    HomepageHeader,
    MusicPlayer
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  html, body {
    height: 100%;
    width: 100%;
  }
  #app {
    height: 100%;
    width: 100%;
  }

  .music-container,.music-asider, .music-main {
    height: 100%;
  }

  .music-container,.music-header,.music-main  {
    background: rgba(0,0,0,0.6);
  }

  .music-header {
    line-height: 60px;
    padding: 10px;
    /*允许拖动*/
    -webkit-app-region: drag;
  }

  .music-footer {
    background: #545c64;
    padding: 0;
  }

  /*整个滚动条*/
  .music-main::-webkit-scrollbar{
    width:10px;
    height:10px;
  }
  /*滚动条轨道*/
  .music-main::-webkit-scrollbar-track{
    opacity: 0;
    border-radius:2px;
  }
  /*滚动条滑块*/
  .music-main::-webkit-scrollbar-thumb{
    background: #333;
    border-radius:10px;
  }
  /*滚动条滑块:hover*/
  .music-main::-webkit-scrollbar-thumb:hover{
    background: #bfbfbf;
  }
  /*当同时有垂直滚动条和水平滚动条时交汇的部分。通常是浏览器窗口的右下角。*/
  .music-main::-webkit-scrollbar-corner{
    background: #31c27c;
  }


  /*自定义图标按钮样式*/
  .my-icon-btn{
    color: rgb(221,224,220);
  }

  .my-icon-btn:active {
    transform:translateY(1px);
  }

  .my-icon-btn:hover {
    color: #31c27c!important;
  }

  /*自定义普通按钮样式*/
  .my-btn {
    padding: 5px;
    height: 20px;
    width: 100px;
    line-height: 20px;
    color: #ebebeb;
    font-size: 14px;
    background: rgb(54,60,63,0.6);
    text-align: center;
    border-radius: 5px;
    border: rgb(54,60,63,0.6) 1px solid;
    cursor: pointer;
  }
  .my-btn-round {
    border-radius: 20px!important;
  }

  .my-btn:hover {
    background: rgba(54,60,63,1);
  }


  .page-title {
    font-size: 30px;
    color: #ffffff;
    font-weight: 600;
    padding: 20px 0;
  }

  .wave {
    width: 10px;
    height: 10px;
    background: url("../src/assets/image/wave.gif") 0 0 no-repeat;
    display: inline-block;
  }
</style>
