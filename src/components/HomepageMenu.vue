<template>
  <el-menu
      class="my-menu"
      default-active="2"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <div class="app-name">
      My Music
    </div>
    <div class="menu-title">
      <span >在线音乐</span>
    </div>
    <el-menu-item index="1" class="my-menu-item">
      <i class="el-icon-menu"></i>
      <span slot="title">推荐</span>
    </el-menu-item>
    <el-menu-item index="2" class="my-menu-item">
      <i class="el-icon-menu"></i>
      <span slot="title">音乐馆</span>
    </el-menu-item>
    <el-menu-item index="3" class="my-menu-item">
      <i class="el-icon-menu"></i>
      <span slot="title">视频</span>
    </el-menu-item>
    <el-menu-item index="4" class="my-menu-item">
      <i class="el-icon-menu"></i>
      <span slot="title">电台</span>
    </el-menu-item>
    <div class="menu-title">
      <span >我的音乐</span>
    </div>
    <el-menu-item index="5" class="my-menu-item">
      <i class="el-icon-setting"></i>
      <span slot="title">我喜欢</span>
    </el-menu-item>
    <el-menu-item index="6" class="my-menu-item">
      <i class="el-icon-setting"></i>
      <span slot="title" @click="()=>this.$router.push('/localmusic')">
          本地音乐
      </span>
    </el-menu-item>
    <el-menu-item index="7" class="my-menu-item">
      <i class="el-icon-setting"></i>
      <span slot="title">最近播放</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "HomepageMenu"
}
</script>

<style scoped>
  .my-menu {
    height: 100%;
    padding-left: 20px ;
    border-right: none;
  }

  .app-name {
    padding: 20px 20px 10px;
    font-size: 20px;
    font-weight: 500;
    color: #fff;
  }

  .menu-title {
    padding: 30px 20px 10px;
  }

  .my-menu-item {
    border-radius: 50px 10px 10px 50px;;
  }

  .menu-title span {
    margin-left: 5px;
    font-size: 10px;
    font-weight: 500;
    color: #fff;
  }
</style>
