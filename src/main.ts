import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 三方库
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// 全局样式
import 'normalize.css'
import '../src/styles/index.less'
import { updateStore } from './store'
const app = createApp(App)
updateStore()
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
