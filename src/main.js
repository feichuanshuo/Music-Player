import Vue from 'vue'
import App from './App.vue'
import { Container , Aside , Main , Header , Footer ,Menu , MenuItem , Button , Divider , Avatar , Image ,Slider} from 'element-ui';
import './assets/icon/iconfont.css'

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

new Vue({
  render: h => h(App),
}).$mount('#app')
