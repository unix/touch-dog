import { $fetch, makeSignCode, queryParse } from '../utils/http'
import { API, DEFAULT_QUERYS, ErrorTips } from '../utils/constants'
import { TranslatorResult } from '../typings/touch-dog'

const findParts = (result: TranslatorResult) => {
  if (!result.dict_result) return []
  const means = result.dict_result.simple_means
  if (!means || !means.symbols || !means.symbols.length) return []
  const parts = means.symbols[0].parts
  if (!parts || !parts.length) return []
  return parts
}

export const toEnglish = async(text: string, token: string, gtk: string): Promise<any> => {
  try {
    const sign: string = makeSignCode(text, gtk)
    const result: TranslatorResult = await $fetch<TranslatorResult>(API.BAIDU, {
      method: 'post',
      body: queryParse(DEFAULT_QUERYS.BAIDU, {
        query: encodeURIComponent(text),
        sign,
        token,
      }),
    })
    if (!result || !result.trans_result) return ErrorTips.translationError
    const data: any = result.trans_result.data
    if (!data || !data.length) return ErrorTips.translationInterruption
    
    return { text: (data[0] || {}).dst, parts: findParts(result) }
  } catch (e) {
    console.log(`Translation Error: ${e}`)
    return ErrorTips.translationError
  }
}

export const toEnglishV2 = async(text: string): Promise<string> => {
  try {
    const reg: RegExp = /\<translation\>\<content\>\<\!\[CDATA\[([\s+\S+]*)\]\]/
    const others: string = ']]><\/content>'
    const url = `${API.PROXY}?dict=${encodeURI(text)}`
    const { message } = await $fetch(url, {})
    if (!message) return ErrorTips.translationError
    let [, ch] = message.match(reg)
    if (!ch) return ErrorTips.translationInterruption
  
    if (ch.includes(others)) ch = ch.split(others)[0]
    return ch
  } catch (e) {
    console.log(`Translation Error: ${e}`)
    return ErrorTips.translationError
  }
}




