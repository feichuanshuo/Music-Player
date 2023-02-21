import VueRouter from "vue-router";
import LocalMusic from "@/pages/LocalMusic.vue";


const router = new VueRouter({
    routes:[
        {
            path:'/localmusic',
            component:LocalMusic
        },
    ]
})

export default router
