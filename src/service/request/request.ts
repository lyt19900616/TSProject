import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

interface YTInterceptor {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}
interface YTConfig extends AxiosRequestConfig {
  interceptors?: YTInterceptor
  showLoading?: boolean
}
class YTRequest {
  // 请求实例
  instance: AxiosInstance
  // loading
  loading?: ILoadingInstance

  showLoading: boolean
  constructor(config: YTConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? true
    // 配置中的拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptor,
      config.interceptors?.requestInterceptor
    )

    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptor,
      config.interceptors?.responseInterceptorCatch
    )

    // 公共拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            text: '数据加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, .4)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // this.loading?.close()
        setTimeout(() => {
          this.loading?.close()
        }, 1000)
        return res
      },
      (err) => {
        return err
      }
    )
  }

  request<T>(config: YTConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.showLoading === false) {
        this.showLoading = false
      }
      if (config.interceptors?.requestInterceptor) {
        this.instance.interceptors.request.use(config.interceptors?.requestInterceptor)
        // config = config.interceptors.requestInterceptor(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          this.showLoading = true
          if (config.interceptors?.responseInterceptor) {
            this.instance.interceptors.response.use(config.interceptors?.responseInterceptor)
            // res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = true
          reject(err)
        })
    })
  }
}
export default YTRequest
