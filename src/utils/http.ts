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

export const queryParse = (...args: any[]): string => {
  const body: any = args.reduce((body, next) => Object.assign({}, body, next),{})
  const query: string = Object.keys(body).reduce((query, next) =>
    `${query ? query + '&' : ''}${next}=${body[next]}`, '')
  return query
}

/**
 *  百度 API 加了鉴权，这是我从编译后的源码里推出来的
 *  不要问我什么意思，我也不知道。优化了一波，人类勉强可读，类型就不加了....
 *  这里用来生成新版 API 必须的 sign 鉴权，gtk 需要从静态 html 里查找，由服务端渲染
 */
const baiduFilter = (r, o) => {
  let t
  for (t = 0; t < o.length - 2; t += 3) {
    let a = o.charAt(t + 2)
    a = a >= 'a' ? a.charCodeAt(0) - 87 : Number(a), a = '+' === o.charAt(t + 1) ? r >>> a : r << a, r = '+' === o.charAt(t) ? r + a & 4294967295 : r ^ a
  }
  return r
}
export const makeSignCode = (text: string, gtk: string = '320305.131321201'): string => {
  const len = text.length, e = gtk.split('.'), u = '+-a^+6', l = '+-3^+b+-f'
  let h, i, d, f, g, S, s
  
  if (len > 30) {
    text = `${text.substr(0, 10)}${text.substr(Math.floor(len / 2) - 5, 10)}${text.substr(-10, 10)}`
  }
  
  for (gtk.split('.'), h = +e[0] || 0, i = +e[1] || 0, d = [], f = 0, g = 0; g < text.length; g++) {
    let m = text.charCodeAt(g)
    128 > m ?
      d[f++] = m :
      (2048 > m ? d[f++] = m >> 6 | 192 : (55296 === (64512 & m) && g + 1 < text.length && 56320 === (64512 & text.charCodeAt(g + 1)) ? (m = 65536 + ((1023 & m) << 10) + (1023 & text.charCodeAt(++g)), d[f++] = m >> 18 | 240, d[f++] = m >> 12 & 63 | 128) : d[f++] = m >> 12 | 224, d[f++] = m >> 6 & 63 | 128), d[f++] = 63 & m | 128)
  }
  
  for (S = h, s = 0; s < d.length; s++) {
    S += d[s], S = baiduFilter(S, u)
  }
  
  return S = baiduFilter(S, l), S ^= i, 0 > S && (S = (2147483647 & S) + 2147483648), S %= 1e6, `${S}.${S ^ h}`
}

