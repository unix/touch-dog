import { findSelectdText } from '../utils/page'
import { EventHub } from './event'

export class MouseHub {
  
  private text: string = ''
  private eventHub: EventHub
  
  static strFilter(text: string): string {
    const str = text.trim()
    // reject chinese
    if (/[\u4e00-\u9fa5]/.test(str)) return ''
    return str
  }
  
  constructor(eventHub: EventHub) {
    this.eventHub = eventHub
    this.init()
  }
  
  private init(): void {
    document.addEventListener('mouseup', (e) => {
      this.updateText(findSelectdText(), { x: e.clientX, y: e.clientY })
    })
  }
  
  private updateText(text?: string, position?: any): void {
    const str = MouseHub.strFilter(text)
    if (!str) return
    if (!str || str === this.text) return
    this.text = str
    this.eventHub.dispath('updateText', { text: str, position })
  }
  
}


