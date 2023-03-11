//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {}
//准备mutations对象——修改state中的数据
const mutations = {
    //设置当前音乐的方法
    setCurrentMusic(state,music){
        state.currentMusic = music
    },
    // 设置播放器状态的方法
    setPlayerStatus(state,isPlay){
        state.isPlay = isPlay
    }

}
//准备state对象——保存具体的数据
const state = {
    currentMusic:{},
    isPlay:false
}

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state
})
