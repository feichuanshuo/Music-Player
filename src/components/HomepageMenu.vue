<template>
  <div class="my-menu">
    <div class="app-name">
      My Music
    </div>
    <div class="menu-title">
      <span>我的音乐</span>
    </div>
    <div class="menu-content">
      <ul>
        <li :class="{'my-menu-item':true,active:$route.path==='/favoritemusic'}" @click="()=>this.$router.push('/favoritemusic')">
          <i class="iconfont icon-aixin_shixin"></i>
          我喜欢
        </li>
        <li :class="{'my-menu-item':true,active:$route.path==='/localmusic'}" @click="()=>this.$router.push('/localmusic')">
          <i class="iconfont icon-diannao"></i>
          本地音乐
        </li>
        <li :class="{'my-menu-item':true,active:$route.path==='/recentmusic'}" @click="()=>this.$router.push('/recentmusic')">
          <i class="iconfont icon-shizhong"></i>
          最近播放
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomepageMenu",
}
</script>

<style scoped>
  .my-menu {
    height: 100%;
    padding-left: 20px ;
    background: rgb(10,0,0);
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

  .menu-title span {
    margin-left: 5px;
    font-size: 10px;
    font-weight: 500;
    color: #fff;
  }

  .my-menu-item {
    padding: 0 30px;
    list-style: none;
    height: 50px;
    line-height: 50px;
    color: #ebebeb;
    border-radius: 50px 10px 10px 50px;
    cursor: pointer;
  }


  .active {
    background: #31c27c;
  }

</style>
