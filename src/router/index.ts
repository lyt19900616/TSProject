import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import storage from '@/utils/storage'
import Layout from '@/views/layout/Layout.vue'

// 静态路由
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    redirect: '/main/analysis/overview',
    component: Layout,
    children: []
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const whiteList: string[] = []
router.beforeEach((to) => {
  // 权限判断
  if (to.path !== '/login') { // 不是去往登录页
    const token = storage.localGet('token')
    if (!token) { // 没有token 的情况
      if (whiteList.indexOf(to.path) === -1) { // 不在白名单
        return '/login'
      }
    }
  }
})
export default router
