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

  .music-container,.music-footer,.music-header,.music-main  {
    background: rgba(84,92,100,0.7);
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
    background: rgb(239, 239, 239);
    border-radius:2px;
  }
  /*滚动条滑块*/
  .music-main::-webkit-scrollbar-thumb{
    background: #bfbfbf;
    border-radius:10px;
  }
  /*滚动条滑块:hover*/
  .music-main::-webkit-scrollbar-thumb:hover{
    background: #333;
  }
  /*当同时有垂直滚动条和水平滚动条时交汇的部分。通常是浏览器窗口的右下角。*/
  .music-main::-webkit-scrollbar-corner{
    background: #179a16;
  }

</style>
