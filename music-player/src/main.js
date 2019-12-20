import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import FastClick from 'fastclick'
import ElementUI from 'element-ui'

import 'swiper/dist/css/swiper.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueAwesomeSwiper /* { default global options } */)

Vue.config.productionTip = false

FastClick.attach(document.body)

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
