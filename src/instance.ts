import { EventHub } from './pool'
import { toEnglish } from './core/translator'
import { TranslateCache, TranslatorEvent } from './typings/touch-dog'


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
    
    const ch: string = await toEnglish(text)
    const next: TranslatorEvent = Object.assign({}, transEevent, { text: ch })
    this.updateCache({ source: text, target: next })
    
    // show tooltip
    this.hub.dispath('showCard', next)
  }
  
  private updateCache(next: TranslateCache): void {
    this.cache = Object.assign({}, this.cache, next)
  }
}

