class Storage {
  // localStorage
  localSet(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  localGet(key: string) {
    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    } else {
      return null
    }
  }
  asyncLocalGet(key: string) {
    return new Promise<any>((resolve) => {
      let result = null
      const value = localStorage.getItem(key)
      if (value) {
        result =  JSON.parse(value)
      }
      resolve(result)
    })
  }
  localRemove(key: string) {
    localStorage.removeItem(key)
  }
  localClear() {
    localStorage.clear()
  }
  // sessionStroage
  sessionSet(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value))
  }
  sessionGet(key: string) {
    const value = sessionStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    } else {
      return null
    }
  }
  sessionRemove(key: string) {
    sessionStorage.removeItem(key)
  }
  sessionClear() {
    sessionStorage.clear()
  }
}

export default new Storage()
