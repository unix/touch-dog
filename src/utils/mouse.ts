import { findSelectdText } from './page'
import { EventHub } from './event'

export class MouseHub {
  
  private text: string = ''
  private eventHub: EventHub
  
  constructor(eventHub: EventHub) {
    this.eventHub = eventHub
    this.init()
  }
  
  private init(): void {
    document.addEventListener('mouseup', () => {
      this.updateText(`${findSelectdText()}`.trim())
    })
  }
  
  private updateText(text?: string): void {
    if (!text || text === this.text) return
    this.text = text
    this.eventHub.dispath('updateText', text)
  }
  
}


