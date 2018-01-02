import { $fetch } from '../utils/http'
import { ErrorTips } from '../utils/constants'

const tokenReg = /\s+token\:\s{1}'{1}(\S+)'{1}\,/
const gtkReg = /window\.gtk\s{1}=\s{1}'{1}(\S+)'{1};/
export const baiduToken = async(): Promise<any> => {
  try {
    const html: string = await $fetch('//fanyi.baidu.com/', {}, 'text')
    const [,token] = html.match(tokenReg)
    const [,gtk] = html.match(gtkReg)
    return { token, gtk }
  } catch (e) {
    console.log(`Translation Error: ${e}`)
    return ErrorTips.tokenError
  }
}
