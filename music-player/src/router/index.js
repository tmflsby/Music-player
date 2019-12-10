import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    redirect: '/find',
    component: () => import('@/views/findIndex'),
    children: [
      {
        path: '/find',
        component: () => import('@/views/findIndex')
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/homeIndex')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active'
})

export default router
