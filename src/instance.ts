import { EventHub } from './pool/event'
import { toEnglish } from './core/translator'
import { TranslatorEvent } from './typings/touch-dog'


export class Touch {
  private hub: EventHub
  
  constructor(eventHub: EventHub) {
    this.hub = eventHub
    this.hub.listen('updateText', (e, translatorEvent: TranslatorEvent) => {
      const { text } = translatorEvent
      toEnglish(text).then(res => {
        const next: TranslatorEvent = Object.assign({}, translatorEvent, res)
        this.hub.dispath('showCard', next)
      })
      
    })
  }
  
  
  
  
  
}

