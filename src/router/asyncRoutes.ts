// 动态路由
import { RouteRecordRaw } from 'vue-router'

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: 'analysis/overview', // 核心技术
    name: '核心技术',
    component: () => import('@/views/system-overview/core-technology.vue')
  },
  {
    path: 'analysis/dashboard', // 商品统计
    name: '商品统计',
    component: () => import('@/views/system-overview/commodity-statistics.vue')
  },
  {
    path: 'system/user', // 用户管理
    name: '用户管理',
    component: () => import('@/views/system-management/user-management.vue')
  },
  {
    path: 'system/department', // 部门管理
    name: '部门管理',
    component: () => import('@/views/system-management/department-management.vue')
  },
  {
    path: 'system/menu', // 菜单管理
    name: '菜单管理',
    component: () => import('@/views/system-management/menu-management.vue')
  },
  {
    path: 'system/role', // 角色管理
    name: '角色管理',
    component: () => import('@/views/system-management/rose-management.vue')
  },
  {
    path: 'product/category', // 商品类别
    name: '商品类别',
    component: () => import('@/views/commodity-center/commodity-category.vue')
  },
  {
    path: 'product/goods', // 商品信息
    name: '商品信息',
    component: () => import('@/views/commodity-center/commodity-info.vue')
  },
  {
    path: 'story/chat', // 你的故事
    name: '你的故事',
    component: () => import('@/views/chat/perfile.vue')
  },
  {
    path: 'story/list', // 故事列表
    name: '故事列表',
    component: () => import('@/views/chat/story-list.vue')
  }
]

