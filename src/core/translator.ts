import { $fetch, queryParse } from '../utils/http'
import { API, DEFAULT_QUERYS, ErrorTips } from '../utils/constants'

type BaiduResult = {
  trans_result: any,
}
export const toEnglish = async(text: string) => {
  try {
    const result: BaiduResult = await $fetch<BaiduResult>(API.BAIDU, {
      method: 'post',
      body: queryParse(DEFAULT_QUERYS.BAIDU, { query: text }),
    })
    if (!result || !result.trans_result) return ErrorTips.translationError
    const data: any = result.trans_result.data
    if (!data || !data.length) return ErrorTips.translationInterruption
    return (data[0] || {}).dst
  } catch (e) {
    console.log(`Translation Error: ${e}`)
    return ErrorTips.translationError
  }
  
}

