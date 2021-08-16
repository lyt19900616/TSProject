import { Module } from 'vuex'
import { IRootState, ILoginState, IDataTyoe } from './type'
import YTHttp from '@/service'
import router from '@/router'
import { RouteRecordRaw } from 'vue-router'
import { asyncRoutes } from '../router/asyncRoutes'
import storage from '@/utils/storage'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      isLogin: false,
      title: '登录',
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {
    getMenus: (state) => {
      return state.userMenus
    }
  },
  mutations: {
    updateToken(state, token: string) {
      state.token = token
    },
    updateIsLogin(state, isLogin: boolean) {
      state.isLogin = isLogin
    },
    updateUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    updateUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      //  动态加载路由
      const hasMenus: RouteRecordRaw[] = []
      const allRecord: any[] = []
      for (const menus of userMenus) {
        if (menus.children) {
          for (const menu of menus.children) {
            allRecord.push(menu)
          }
        } else {
          allRecord.push(menus)
        }
      }
      for (let i = 0; i < allRecord.length; i++) {
        for (let j = 0; j < asyncRoutes.length; j++) {
          if (asyncRoutes[j].name === allRecord[i].name) {
            hasMenus.push(asyncRoutes[j])
            break
          }
        }
      }
      hasMenus.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    async loginAction({ commit }, payload: any) {
      const data = {
        name: payload.account,
        password: payload.pwd
      }
      // 1. 更新token 更新登录状态 将token存储在本地
      const result = await YTHttp.request<IDataTyoe>({
        url: '/login',
        method: 'POST',
        showLoading: false,
        data
      })
      commit('updateToken', result.data.token)
      commit('updateIsLogin', false)
      storage.localSet('token', result.data.token)
      if(!result.data.id) {
        return
      }
      // 2. 请求用户信息 存储用户信息
      const userInfo = await YTHttp.request<IDataTyoe>({
        url: `/users/${result.data.id}`,
        method: 'get'
      })
      commit('updateUserInfo', userInfo.data)
      storage.localSet('userInfo', userInfo.data)

      if (!userInfo.data.role.id) {
        return
      }
      // 3. 获取用户权限菜单 存储菜单
      const userMenus = await YTHttp.request<IDataTyoe>({
        url: `/role/${userInfo.data.role.id}/menu`,
        method: 'get',
        showLoading: false
      })
      commit('updateUserMenus', userMenus.data)
      storage.localSet('userMenus', userMenus.data)
      // console.log(userMenus)

      // 跳转到首页
      router.push('/')
    },
    loadLocalLoginData({ commit }) {
      const token = storage.localGet('token')
      if (token) {
        commit('updateToken', token)
      }
      const userInfo = storage.localGet('userInfo')
      if (userInfo) {
        commit('updateUserInfo', userInfo)
      }
      const userMenus = storage.localGet('userMenus')
      if (userMenus) {
        commit('updateUserMenus', userMenus)
      }
    }
  }
}
export default loginModule
