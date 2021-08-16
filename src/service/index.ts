import YTRequest from './request/request'
import { ElMessageBox } from 'element-plus'
import router from '@/router'
import storage from '@/utils/storage'

const YTHttp = new YTRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 1000,
  interceptors: {
    requestInterceptor: (config) => {
      // 请求拦截
      const token = storage.localGet('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    requestInterceptorCatch: (err) => {
      // 请求错误拦截
      return err
    },
    responseInterceptor: (res) => {
      // 响应拦截
      return res.data
    },
    responseInterceptorCatch: (err) => {
      // 响应错误拦截
      console.log(err.response);
      if (err && err.response.status) {
        const status = err.response.status
        switch(status) {
          case 401: // 无效token
          ElMessageBox.alert('token无效', '请重新登录', {
            confirmButtonText: '确定',
            callback: () => {
              router.push('/login')
            }
          })
          break
          default:
          ElMessageBox.alert('待完善', '其他类型响应错误', {
            confirmButtonText: '确定',
            callback: () => {
              alert(status)
            }
          })
        }

      }
      return err
    }
  }
})

export default YTHttp
