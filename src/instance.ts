import { EventHub } from './pool/event'
import { toEnglish } from './core/translator'


export class Touch {
  private hub: EventHub
  
  constructor(eventHub: EventHub) {
    this.hub = eventHub
    this.hub.listen('updateText', (e, { text, position }) => {
      console.log(text)
      // toEnglish(text).then()
      this.hub.dispath('showCard', { dist: '一段文字', position })
    })
  }
  
  
  
  
  
}

