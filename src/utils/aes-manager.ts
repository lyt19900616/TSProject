import { AES, mode, pad, enc } from 'crypto-js'
const PUBLICKEY = 'liyaoting0616@126.com'

class AesManager {
  /**
   *  加密
   * @param target 明文
   * @returns 加密结果
   */
  encrypt(target: any): string {
    const str = AES.encrypt(target, PUBLICKEY, {
      mode: mode.CBC,
      padding: pad.Pkcs7
    })
    return str.toString()
  }

  decrypt(result: string): string {
    const str = AES.decrypt(result, PUBLICKEY, {
      mode: mode.CBC,
      padding: pad.Pkcs7
    })
    return str.toString(enc.Utf8)
  }
}
export default new AesManager()
