<template>
  <div id="localMusicPage">
<!--遮罩层-->
    <div class="modal-shade" v-show="shade"></div>
    <header class="page-title">本地音乐</header>
<!--添加音乐弹窗-->
    <Popover location="bottom">
      <template v-slot:box>
        <ul class="popover-menu">
          <li @click="addLocalMusic">
            手动添加音乐
          </li>
          <li @click="()=>{showScanBox = true}">
            自动扫描音乐
          </li>
        </ul>
      </template>
      <template v-slot:button>
        <div class="my-btn my-btn-round">
          添加
        </div>
      </template>
    </Popover>
    <div class="page-content">
      <Table :table-data="musicList"></Table>
    </div>
<!--音乐扫描弹窗-->
    <Popup :show="showScanBox" title="自动扫描添加" @hideModal="()=>{showScanBox=false}" @submit="scanFiles">
      <div class="scan-box">
          <div class="scan-box-header">
            <p>勾选自动扫描的文件夹</p>
            <button @click="addMusicFile">添加文件夹</button>
          </div>
          <div class="scan-box-content">
              <ul>
                <li v-for="(item,index) in scanFilePathList" :key="index">
                  <el-checkbox
                      v-model="item.isChecked"
                  >
                    {{item.path}}
                  </el-checkbox>
                  <i class="iconfont icon-close my-icon-btn" @click="()=>{scanFilePathList.splice(index,1)}"></i>
                </li>
              </ul>
          </div>
      </div>
    </Popup>
  </div>
</template>

<script>
import {Message} from "element-ui";
import Popover from "../../assets/module/Popover.vue";
import Popup from "@/assets/module/Popup.vue";
import Table from "@/assets/module/Table.vue";
const { getCurrentWindow,dialog,fs,jsmediatags } = window
export default {
  name: "LocalMusic",
  data() {
    return {
      // 本地音乐列表
      musicList: [],
      showScanBox: false,
      // 扫描文件夹列表
      scanFilePathList: [],
      // 启用遮罩层
      shade:false
    }
  },
  components: {
    Popover,Popup,Table
  },
  methods:{
    // 更换歌曲
    changeMusic(data){
      this.$bus.$emit('setCurrentMusic',data,this.musicList)
    },
    // 添加本地音乐
    addLocalMusic(){
      this.shade = true
      let success = 0
      let fail = 0
      dialog.showOpenDialog(getCurrentWindow(),{
        title:'添加音乐',
        properties:['multiSelections'],
      }).then(result=>{
        const {canceled,filePaths} = result
        for (let i = 0; i < filePaths.length; i++) {
          if(this.addMusicToList(filePaths[i])){
            success++
          }
          else{
            fail++
          }
        }
        if(!canceled){
          Message({
            message:'添加成功'+success+'首，失败'+fail+'首',
            duration: 1500,
            type: 'success'
          })
        }
        this.shade = false
      })
    },

    // 扫描本地音乐
    scanFiles() {
        this.scanFilePathList.forEach(item=>{
          if(item.isChecked){
            fs.readdir(item.path, (err, data) => {
              if (err) return console.error(err);
              for (let i = 0; i < data.length; i++) {
                let musicpath = item.path + '\\' + data[i];
                this.addMusicToList(musicpath)
              }
            })
          }
        })
        this.showScanBox = false
    },

    // 添加扫描文件夹
    addMusicFile(){
      this.shade = true
      dialog.showOpenDialog(getCurrentWindow(),{
        title:'导入',
        properties:['openDirectory'],
      }).then(result=>{
        const {canceled,filePaths} = result
        if(!canceled){
          if(this.scanFilePathList.find(item=>item.path === filePaths[0])){
            Message({
              message:'文件夹已存在',
              duration: 1500,
              type: 'warning'
            })
            return
          }
          this.scanFilePathList.unshift({
            path:filePaths[0],
            isChecked: true
          })
        }
        this.shade = false
      })
    },

    // 添加音乐到本地音乐列表
    addMusicToList(musicPath){
      jsmediatags.read(musicPath,{
        onSuccess: (song)=>{
          let {tags} = song
          let musicMessage = {
            name: tags.title?tags.title:musicPath.split('\\')[-1].split('.')[0],
            singer: tags.artist,
            album: tags.album,
            src: musicPath
          };
          if(this.musicList.find(item=>item.src === musicMessage.src)) {
            // 音乐与列表音乐冲突，添加失败
            return false
          }
          else{
            // 添加成功
            this.musicList.unshift(musicMessage);
            return true
          }
        },
        onError: function(error) {
          console.log(':(', error.type, error.info);
        }
      }
      )
    },

    // 删除列表中的音乐
    deleteMusic(music){
      let index = this.musicList.findIndex(item=>item.src === music.src)
      this.musicList.splice(index,1)
    }
  },
  updated() {
    window.localStorage.setItem('localMusicList',JSON.stringify(this.musicList))
    window.localStorage.setItem('scanFilePathList',JSON.stringify(this.scanFilePathList))
  },
  mounted() {
    this.musicList = JSON.parse(window.localStorage.getItem('localMusicList')) || []
    this.scanFilePathList = JSON.parse(window.localStorage.getItem('scanFilePathList')) || []
    this.$bus.$on('delMusicFromLL',this.deleteMusic)
    this.$bus.$on('changeMusic',this.changeMusic)
  }
}
</script>

<style scoped>
  #localMusicPage {
    background: inherit;
  }
  .modal-shade {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 11;
  }

  .page-content {
    padding: 10px;
  }

  .el-table tbody tr:hover>td{
    background: rgba(84,92,100,0.7) !important
  }
  .el-table--border::after, .el-table--group::after, .el-table::before {
    background: none;
  }

  .popover-menu{
    text-align: center;
    list-style: none;
    padding: 0;
    margin: 0;
    color: #ebebeb;
  }
  .popover-menu li {
    padding: 5px;
  }
  .popover-menu li:hover{
    background: #3e4146;
    cursor: pointer;
  }

  .scan-box {
    width: 500px;
  }

  .scan-box-header {
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin: 10px 0;
  }

  .scan-box-header p {
    display: inline-block;
    float: left;
  }

  .scan-box-header button {
    float: right;
    padding: 5px;
    height: 30px;
    box-sizing: border-box;
  }

  .scan-box-content {
    background: #F5F5F5FF;
    width: 100%;
    height: 260px;
  }

  .scan-box-content ul {
    list-style: none;
    padding: 0 20px;
    margin: 0;
  }

  .scan-box-content li {
    border-bottom: #e1e1e1 1px solid;
    height: 40px;
    line-height: 40px;
  }
  .scan-box-content li i {
    float: right;
    cursor: pointer;
  }

  .empty-box{
    width: 100%;
    height: 230px;
    line-height: 300px;
  }

  .empty-box i {
    font-size: 180px;
  }

</style>
