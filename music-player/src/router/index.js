import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    /**
     * 设置页面初次加载后默认显示 find 页面
     */
    path: '/',
    redirect: '/find'
  },
  {
    path: '/find',
    name: 'main',
    component: () => import('@/views/findIndex')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/homeIndex')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/loginIndex')
  },
  {
    path: '/phone',
    name: 'phoneAccount',
    component: () => import('@/views/loginIndex/components/phoneAccount.vue')
  },
  {
    path: '/pwd',
    name: 'phonePwd',
    component: () => import('@/views/loginIndex/components/phonePwd.vue')
  },
  {
    path: '/verify',
    name: 'phoneVerify',
    component: () => import('@/views/loginIndex/components/phoneVerify.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  /**************************************************
   *
   * 设置 链接激活时使用的 CSS 类名
   * 默认值: "router-link-active"
   * 可以通过路由的构造选项 linkActiveClass 来全局配置。
   *
   **************************************************/
  linkActiveClass: 'active'
})

export default router
