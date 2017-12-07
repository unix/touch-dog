import { EventHub } from './pool/event'
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
  
  translate(transEevent: TranslatorEvent): void {
    const { text } = transEevent
    // use cache first
    if (this.cache.source === text) {
      return this.hub.dispath('showCard', this.cache.target)
    }
    
    this.cache.source = text
    toEnglish(text).then(res => {
      const next: TranslatorEvent = Object.assign({}, transEevent, res)
      this.cache.target = next
      this.hub.dispath('showCard', next)
    })
  }
  
}

