<template>
  <div style="height: 40px;line-height: 40px; display: flex; width: 100%;">
    <div class="left-panel">
      <i class="el-icon-arrow-left my-icon" title="后退"></i>
      <i class="el-icon-arrow-right my-icon" title="前进"></i>
      <div class="search-input">
        <input type="text" placeholder="搜索音乐" v-model="songName"/>
        <i class="el-icon-search search-icon" @click="searchMusic"></i>
      </div>
    </div>
    <div class="right-panel">
      <div class="user-panel">
        <el-avatar src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" :size="30" class="user-avatar"></el-avatar>
        <span>超人阿光</span>
      </div>
      <div class="control-panel">
        <i class="iconfont icon-menu my-btn"></i>
        <el-divider direction="vertical"></el-divider>
        <i class="iconfont icon-minus my-btn" @click="minWindow"></i>
        <i v-if="isMax" class="iconfont icon-compress my-btn" @click="restoreWindow"></i>
        <i v-else class="iconfont icon-expend my-btn" @click="maxWindow"></i>
        <i class="iconfont icon-close my-btn" @click="closeWindow"></i>
      </div>
    </div>
  </div>
</template>

<script>
import {requestMusic} from "@/api";
const {ipcRenderer} = window.require('electron')

export default {
  name: "HomepageHeader",
  data(){
    return {
      songName: '',
      searchResult: [],
      isMax: false
    }
  },
  methods: {
    // 搜索音乐
    searchMusic(){
      requestMusic(this.songName).then(res => {

        console.log(res)
      })
    },
    // 关闭窗口
    closeWindow(){
      ipcRenderer.send('close-window');
    },
    // 最大化窗口
    maxWindow(){
      ipcRenderer.send('max-window');
      this.isMax = true;
    },
    // 还原窗口
    restoreWindow(){
      ipcRenderer.send('restore-window');
      this.isMax = false;
    },
    // 最小化窗口
    minWindow(){
      ipcRenderer.send('min-window');
    }
  }
}
</script>

<style scoped>
  .my-icon {
    color: #fff;
    font-size: 20px;
    padding: 10px 5px;
  }
  .search-input {
    border: solid 1px #fff;
    border-radius: 20px;
    height: 30px;
    line-height: 30px;
    display: flex;
    padding: 0 10px;
    background: #fff;
  }
  .search-input input {
    border: 0;
    width: 100%;
    outline: 0;
  }

  .search-icon {
    font-size: 16px;
    padding: 7px 0;
  }

  .search-icon:hover {
    color: #15c21d;
  }

  .left-panel {
    flex: 1;
    display: flex;
    align-items: center;
    background: inherit;
  }

  .right-panel {
    flex:1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .user-panel {
    order: 1;
    flex: 4;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .user-avatar {
    margin-right: 10px;
  }

  .user-panel span {

    color: #fff;
    font-size: 14px;
    margin: auto 10px;
  }

  .control-panel {
    order: 2;
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .control-panel i {
    padding: 10px 5px;
  }

  .control-panel * {
    /*阻止拖动*/
    -webkit-app-region: no-drag;
  }

</style>
