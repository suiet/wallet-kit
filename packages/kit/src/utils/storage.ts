export class Storage {
  constructor() {
    if (!window) {
      throw new Error('window not found: storage should be used in browser env')
    }
  }
  get length() {
    return window.localStorage.length;
  }
  setItem(key: string, value: any) {
    try {
      let _value = JSON.stringify(value);
      return window.localStorage.setItem(key, _value)
    } catch (e) {
      throw new Error('stringify data failed when setItem: ' + (e as Error).message)
    }
  }
  getItem(key: string) {
    const res = window.localStorage.getItem(key)
    if (!res) return res
    try {
      return JSON.parse(res)
    } catch (e) {
      throw new Error('parse data failed when getItem: ' + (e as Error).message)
    }
  }
  removeItem(key: string) {
    return window.localStorage.removeItem(key)
  }
  clear() {
    return window.localStorage.clear()
  }
}
