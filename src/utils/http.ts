import { DEFAILT_HEADERS, DEFAILT_REQUEST_OPTIONS } from './constants'

const makeInit = (options:any = {}): RequestInit => {
  const userHeaders = options.headers || {}
  const headers: Headers = new Headers(Object.assign({}, DEFAILT_HEADERS, userHeaders))
  return Object.assign({}, DEFAILT_REQUEST_OPTIONS, options, { headers })
}

export const $fetch = <T>(url, options: any = {}, filterMethod: string = 'json'):
Promise<T | any> => {
  const init: RequestInit = makeInit(options)
  return new Promise((resolve, reject) => {
    fetch(url, init)
      .then(res => {
        if (res.status === 204) return resolve({})
        return res[filterMethod]()
      })
      .then(json => resolve(json))
      .catch(err => reject(err))
  })
}
