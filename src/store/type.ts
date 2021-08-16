export interface IRootState {
  name: string
  age: number
}
export interface ILoginState {
  isLogin: boolean
  title: string
  token: string
  userInfo: any,
  userMenus: any,
}
export interface IDataTyoe<T = any> {
  code: number
  data: T
}
