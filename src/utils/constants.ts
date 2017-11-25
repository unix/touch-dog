
export const DEFAILT_REQUEST_OPTIONS: any = {
  method: 'GET',
  mode: 'cors',
  cache: 'default',
}

export const DEFAILT_HEADERS: any = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'Accept': '*/*',
  'X-Requested-With': 'XMLHttpRequest',
}


export const API: any = {
  BAIDU: 'http://fanyi.baidu.com/v2transapi',
}

export const DEFAULT_QUERYS: any = {
  BAIDU: {
    from: 'zh',
    to: 'en',
    query: '',
    transtype: 'realtime',
    simple_means_flag: 3,
  },
}

export const ErrorTips: any = {
  translationError: '翻译出现了错误',
  translationInterruption: '未找到合适的翻译',
}
