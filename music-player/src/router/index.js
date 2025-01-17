import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// Uncaught (in promise) NavigationDuplicated {_name: "NavigationDuplicated"}的解决方法
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

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
        component: () => import('@/views/searchResults/composite')
      },
      {
        // 单曲页面
        path: '/song/:id',
        component: () => import('@/views/searchResults/songIndex')
      },
      {
        // 视频页面
        path: '/video/:id',
        component: () => import('@/views/searchResults/videoIndex')
      },
      {
        // 歌手页面
        path: '/artist/:id',
        component: () => import('@/views/searchResults/artistIndex')
      },
      {
        // 专辑页面
        path: '/album/:id',
        component: () => import('@/views/searchResults/albumIndex')
      },
      {
        // 歌单页面
        path: '/playList/:id',
        component: () => import('@/views/searchResults/playListIndex')
      },
      {
        // 主播电台页面
        path: '/djRadio/:id',
        component: () => import('@/views/searchResults/djRadioIndex')
      },
      {
        // 用户页面
        path: '/user/:id',
        component: () => import('@/views/searchResults/userIndex')
      }
    ]
  },
  {
    // 每日推荐页面
    path: '/dateRecommend',
    component: () => import('@/views/dateRecommend')
  },
  {
    // 歌单广场页面
    path: '/recommend',
    component: () => import('@/views/recommend'),
    redirect: '/recommended',
    children: [
      {
        // 推荐歌单
        path: '/recommended',
        component: () => import('@/views/recommend/recommended')
      },
      {
        // 精品歌单
        path: '/fine',
        component: () => import('@/views/recommend/fine')
      },
      {
        // 通用歌单
        path: '/general/:id',
        component: () => import('@/views/recommend/general')
      }
    ]
  },
  {
    // 排行榜页面
    path: '/rank',
    component: () => import('@/views/rank')
  },
  {
    // 电台页面
    path: '/dj',
    component: () => import('@/views/dj')
  },
  {
    // 私人 FM 页面
    path: '/personalFm',
    component: () => import('@/views/personalFm')
  },
  {
    // 通用歌单展示页面
    path: '/songListPage/:id',
    component: () => import('@/base/songListPage')
  },
  {
    // 通用专辑展示页面
    path: '/albumPage/:id',
    component: () => import('@/base/albumPage')
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
   * 通过设置 meta: { keepAlive: true },来定义一个页面是否需要做缓存
   *
   **************************************************/
  linkActiveClass: 'active'
})

export default router
