import { EventHub } from './event'
import { LOGO, STYLES } from '../utils/constants'

export class Card {
  
  private eventHub: EventHub
  private el: HTMLElement
  
  constructor(eventHub: EventHub) {
    this.eventHub = eventHub
    this.init()
  }
  
  private init(): void {
    this.el = this.makeTemplate()
    document.body.appendChild(this.el)
    document.head.appendChild(this.makeStyles())
    this.eventHub.listen('showCard', (e, result) => {
      this.update(result)
    })
    this.el.addEventListener('click', (e: Event) => {
      e.stopPropagation()
    })
  }
  
  private makeTemplate(): HTMLElement {
    const _div: HTMLElement = document.createElement('div')
    _div.style.top = '-2000px'
    _div.style.left = '-2000px'
    _div.setAttribute('id', '-touch-dog')
    _div.classList.add('-touch-dog')
    _div.innerHTML = `
      <p>default</p>
      <ul>
        <li></li>
      </ul>
      <div class="-touch-dog-logo">${LOGO}</div>
    `
    return _div
  }
  
  private makeStyles(): HTMLElement {
    const styles: HTMLElement = document.createElement('style')
    styles.setAttribute('type', 'text/css')
    styles.appendChild(document.createTextNode(STYLES))
    return styles
  }
  
  private update(message: any): void {
    const SAFE_MARGIN: number = 30
    const position: any = message.position
    let nextX: number = position.x + 15
    let nextY: number = position.y + 25
    const { height, width } = this.el.getClientRects()[0]
    
    if (nextX + width + SAFE_MARGIN > document.documentElement.clientWidth) {
      nextX = nextX - (nextX + width + SAFE_MARGIN - document.documentElement.clientWidth)
    }
    if (nextY + height + SAFE_MARGIN > document.documentElement.clientHeight) {
      nextY = nextY - height - SAFE_MARGIN - 25
    }
    this.el.style.display = 'none'
    this.el.style.top = `${nextY}px`
    this.el.style.left = `${nextX}px`
    this.el.style.display = 'block'
    
    const close: EventListener = () => {
      this.el.style.display = 'none'
      this.el.style.top = '-2000px'
      this.el.style.left = '-2000px'
      this.el.style.display = 'block'
      document.removeEventListener('click', close)
    }
    const timer: any = setTimeout(() => {
      document.addEventListener('click', close)
      clearTimeout(timer)
    }, 0)
  }
  
}

