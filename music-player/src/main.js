import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import FastClick from 'fastclick'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'

import 'swiper/dist/css/swiper.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueAwesomeSwiper /* { default global options } */)

Vue.config.productionTip = false

FastClick.attach(document.body)

Vue.use(ElementUI)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '@/assets/load.gif',
  loading: 'https://s2.ax1x.com/2019/09/08/n8qAAS.gif',
  attempt: 1,
  listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
