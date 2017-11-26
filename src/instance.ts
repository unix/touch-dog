import { EventHub } from './pool/event'
import { toEnglish } from './core/translator'
import { TranslatorEvent } from './typings/touch-dog'


export class Touch {
  private hub: EventHub
  
  constructor(eventHub: EventHub) {
    this.hub = eventHub
    this.hub.listen('updateText', (e, transEevent) => {
      this.translate(transEevent)
    })
  }
  
  translate(transEevent: TranslatorEvent): void {
    const { text } = transEevent
    toEnglish(text).then(res => {
      const next: TranslatorEvent = Object.assign({}, transEevent, res)
      this.hub.dispath('showCard', next)
    })
  }
  
}

