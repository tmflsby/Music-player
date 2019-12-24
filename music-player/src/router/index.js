import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    /**
     * 设置页面初次加载后默认显示 find 页面
     */
    path: '/',
    name: 'main',
    redirect: '/find',
    component: () => import('@/views/nav'),
    children: [
      {
        path: 'find',
        component: () => import('@/views/findIndex')
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/homeIndex')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/loginIndex')
  },
  // 登录的一系列路由
  {
    path: '/phone',
    component: () => import('@/views/loginIndex/components/accountLogin.vue'),
    children: [
      {
        path: '',
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
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/searchIndex')
  },
  {
    path: '/searchResults/:id',
    component: () => import('@/views/searchResults'),
    redirect: '/composite/:id',
    children: [
      {
        // 综合页面
        path: '/composite/:id',
        component: () => import('../views/searchResults/composite')
      },
      {
        // 单曲页面
        path: '/song/:id',
        component: () => import('../views/searchResults/songIndex')
      },
      {
        // 视频页面
        path: '/video/:id',
        component: () => import('../views/searchResults/videoIndex')
      },
      {
        // 歌手页面
        path: '/artist/:id',
        component: () => import('../views/searchResults/artistIndex')
      },
      {
        // 专辑页面
        path: '/album/:id',
        component: () => import('../views/searchResults/albumIndex')
      },
      {
        // 歌单页面
        path: '/playList/:id',
        component: () => import('../views/searchResults/playListIndex')
      },
      {
        // 主播电台页面
        path: '/djRadio/:id',
        component: () => import('../views/searchResults/djRadioIndex')
      },
      {
        // 用户页面
        path: '/user/:id',
        component: () => import('../views/searchResults/userIndex')
      }
    ]
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
