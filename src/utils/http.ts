import { DEFAILT_HEADERS, DEFAILT_REQUEST_OPTIONS } from './constants'

const makeInit = (options:any = {}): RequestInit => {
  const userHeaders = options.headers || {}
  const headers: Headers = new Headers(Object.assign({}, DEFAILT_HEADERS, userHeaders))
  return Object.assign({}, DEFAILT_REQUEST_OPTIONS, options, { headers })
}

export const $fetch = <T>(url, options: RequestInit = {}): Promise<T | any> => {
  const init: RequestInit = makeInit(options)
  return new Promise((resolve, reject) => {
    fetch(url, init)
    .then(res => {
      if (res.status === 204) return resolve({})
      return res.json()
    })
    .then(json => resolve(json))
    .catch(err => reject(err))
  })
}

export const queryParse = (...args: any[]): string => {
  const body: any = args.reduce((body, next) => Object.assign({}, body, next),{})
  const query: string = Object.keys(body).reduce((query, next) =>
    `${query ? query + '&' : ''}${next}=${body[next]}`, '')
  return query
}
