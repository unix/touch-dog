import { EventHub } from './pool/event'
import { toEnglish, toEnglishV2 } from './core/translator'
import { TranslateCache, TranslatorEvent } from './typings/touch-dog'
import { baiduToken } from './core/token'


export class Touch {
  
  private hub: EventHub
  private cache: TranslateCache = {}
  
  constructor(eventHub: EventHub) {
    this.hub = eventHub
    this.hub.listen('updateText', (e, transEevent) => {
      this.translate(transEevent)
    })
  }
  
  async translate(transEevent: TranslatorEvent): Promise<void> {
    const { text } = transEevent
    
    // use cache first
    if (this.cache.source === text) {
      return this.hub.dispath('showCard', this.cache.target)
    }
    
    // if (!this.cache.token) await this.updateToken()
    // const { token, gtk } = this.cache
    // const response: any = await toEnglish(text, token, gtk)
    const ch: string = await toEnglishV2(text)
    const next: TranslatorEvent = Object.assign({}, transEevent, { text: ch })
    this.updateCache({ source: text, target: next })
    
    // show tooltip
    this.hub.dispath('showCard', next)
  }
  
  async updateToken(): Promise<void> {
    const { token, gtk } = await baiduToken()
    this.updateCache({ token, gtk })
  }
  
  private updateCache(next: TranslateCache): void {
    this.cache = Object.assign({}, this.cache, next)
  }
  
}

