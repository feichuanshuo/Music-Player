import Vue from 'vue'
import App from './App.vue'
import { Container , Aside , Main , Header , Footer ,Menu , MenuItem , Button , Divider , Avatar , Image ,Slider , Table , TableColumn} from 'element-ui';
import './assets/icon/iconfont.css'
import router from "@/router";
import store from "@/store";

Vue.config.productionTip = false

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
Vue.use(Table);
Vue.use(TableColumn);

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
  },
}).$mount('#app')
