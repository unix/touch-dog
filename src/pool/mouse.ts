import { findSelectdText } from '../utils/page'
import { EventHub } from './event'

export class MouseHub {

  private text: string = ''
  private eventHub: EventHub
  private touchStatus: string = 'select'       // 'close', 'select', 'zone'

  static strFilter(text: string): string {
    const str = text.trim()
    // ignore char except alphabet hyphen and blank
    return /[^A-Za-z\s-]/.test(str) ? '' : str
  }

  constructor(eventHub: EventHub, defaultTouchStatus: string) {
    this.touchStatus = defaultTouchStatus
    this.eventHub = eventHub
    this.init()
    this.listenRuntime()
  }

  private listenRuntime(): void {
    chrome.runtime.onMessage.addListener(({ touchStatus }) => {
      if (!touchStatus) return
      this.touchStatus = touchStatus
    })
  }

  private init(): void {
    const handle: EventListener = (e: MouseEvent) => {
      this.updateText(findSelectdText(), { x: e.clientX, y: e.clientY })
    }
    document.addEventListener('mouseup', (e: MouseEvent) => {
      this.touchStatus === 'select' && handle(e)
    })
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (this.touchStatus === 'close') return
      if (e.keyCode !== 18 || this.touchStatus !== 'zone') return
      const handle = (e: KeyboardEvent) => {
        if (e.keyCode !== 18 && this.touchStatus !== 'select') return
        this.touchStatus = 'zone'
        document.removeEventListener('keyup', handle)
      }
      this.touchStatus = 'select'
      document.addEventListener('keyup', handle)
    })

  }

  private updateText(text?: string, position?: any): void {
    const str = MouseHub.strFilter(text)
    if (!str) return
    this.text = str
    this.eventHub.dispath('updateText', { text: str, position })
  }

}
