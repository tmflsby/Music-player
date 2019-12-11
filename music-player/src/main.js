import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ModalHelper from './assets/utils/modalScroll'

import 'swiper/dist/css/swiper.css'
import '@/assets/styles/global.css'

Vue.use(VueAwesomeSwiper /* { default global options } */)

Vue.prototype.$modalHelper = ModalHelper

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
