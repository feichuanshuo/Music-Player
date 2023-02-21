import Vue from 'vue'
import App from './App.vue'
import VueRouter  from "vue-router";
import { Container , Aside , Main , Header , Footer ,Menu , MenuItem , Button , Divider , Avatar , Image ,Slider} from 'element-ui';
import './assets/icon/iconfont.css'
import router from "@/router";

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Header)
Vue.use(Container);
Vue.use(Aside);
Vue.use(Footer);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Button);
Vue.use(Divider);
Vue.use(Avatar);
Vue.use(Image);
Vue.use(Slider);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
