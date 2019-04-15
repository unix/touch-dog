import { $fetch } from '../utils/http'
import { API, ErrorTips } from '../utils/constants'

export const toEnglish = async(text: string): Promise<string> => {
  const url = `${API.PROXY}`
  const result = await $fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      text: text,
      from: 'en', to: 'zh',
    }),
  })
  if (!result || !result.trans_result || !result.trans_result.length)
    return ErrorTips.translationError
  return (result.trans_result[0] || {}).dst
}

