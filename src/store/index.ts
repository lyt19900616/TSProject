import { createStore } from 'vuex'
import { IRootState } from './type'
import login from './login'

const store = createStore<IRootState>({
  state() {
    return {
      name: '',
      age: 1
    }
  },
  mutations: {},
  actions: {},
  modules: {
    login
  }
})

export function updateStore(): void {
  store.dispatch('login/loadLocalLoginData')
}

export default store
