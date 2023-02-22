import VueRouter from "vue-router";
import Vue from 'vue'
import LocalMusic from "@/pages/LocalMusic.vue";

Vue.use(VueRouter);


const router = new VueRouter({
    mode:'hash',
    routes:[
        {
            path:'/localmusic',
            component:LocalMusic
        },
    ]
})

export default router
