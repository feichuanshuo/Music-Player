import VueRouter from "vue-router";
import Vue from 'vue'
import LocalMusic from "@/pages/LocalMusic/index.vue";
import FavoriteMusic from "@/pages/FavoriteMusic/index.vue";
import RecentMusic from "@/pages/RecentMusic/index.vue";

Vue.use(VueRouter);


const router = new VueRouter({
    mode:'hash',
    routes:[
        {
            path:'/localmusic',
            component:LocalMusic,
        },
        {
            path:'/favoritemusic',
            component:FavoriteMusic,
        },
        {
            path:'/recentmusic',
            component:RecentMusic,
        },
        {
            path:'*',
            redirect:'/localmusic'
        }
    ]
})

export default router
