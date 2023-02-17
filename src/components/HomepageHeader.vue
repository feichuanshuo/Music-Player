<template>
  <div style="height: 40px;line-height: 40px; display: flex; width: 100%">
    <div class="page-panel">
      <i class="el-icon-arrow-left my-icon" title="后退"></i>
      <i class="el-icon-arrow-right my-icon" title="前进"></i>
      <div class="search-input">
        <input type="text" placeholder="搜索音乐"/>
        <i class="el-icon-search search-icon"></i>
      </div>
    </div>
    <div class="user-panel">
      <el-avatar src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" :size="30" class="user-avatar"></el-avatar>
      <span>超人阿光</span>
    </div>
    <div class="control-panel">
      <i class="el-icon-s-operation"></i>
      <el-divider direction="vertical"></el-divider>
      <i class="el-icon-minus"></i>
      <i class="el-icon-full-screen"></i>
      <i class="el-icon-close"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomepageHeader"
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
    width: 200px;
    order: 0;
    flex: 1;
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

  .page-panel {
    order: 0;
    flex: 5;
    display: flex;
    align-items: center;
    padding-right: 50%;
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

</style>
