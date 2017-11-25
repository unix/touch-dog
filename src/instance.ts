import { EventHub } from './utils/event'


export class Touch {
  private hub: EventHub
  
  constructor(eventHub: EventHub) {
    this.hub = eventHub
    this.hub.listen('updateText', (e, text) => {
      console.log(text)
    })
  }
  
  
  
  
  
}

