import { EventHub } from './event'
import { LOGO, STYLES } from '../utils/constants'
import { TranslatorEvent } from '../typings/touch-dog'

export class Card {
  
  private eventHub: EventHub
  private el: HTMLElement
  
  static makeTemplate(trans?: TranslatorEvent): string {
    if (!trans) return '<p></p>'
    const title: string = `<p class="-touch-dog-title">${trans.text}</p>`
    const parts = trans.parts || []
    const list: string = parts.map(part =>
      `<li><b>${part.part}</b>${part.means.map((t) => `<span>${t};</span>`).join('')}</li>`)
      .join('')
    const ul: string = list ? `<ul class="-touch-dog-list">${list}</ul>` : ''
    return `
      ${title}
      ${ul}
      <div class="-touch-dog-logo">${LOGO}</div>
      <div class="paper"></div>
    `
  }
  
  constructor(eventHub: EventHub) {
    this.eventHub = eventHub
    this.init()
  }
  
  private init(): void {
    this.el = this.makeTemplate()
    document.body.appendChild(this.el)
    document.head.appendChild(this.makeStyles())
    this.eventHub.listen('showCard', (e, trans) => {
      this.update(trans)
    })
    this.el.addEventListener('click', (e: Event) => {
      e.stopPropagation()
    })
    this.el.addEventListener('mouseup', (e: Event) => e.stopPropagation())
  }
  
  private makeTemplate(): HTMLElement {
    const _div: HTMLElement = document.createElement('div')
    _div.style.top = '-2000px'
    _div.style.left = '-2000px'
    _div.setAttribute('id', '-touch-dog')
    _div.classList.add('-touch-dog')
    _div.innerHTML = Card.makeTemplate()
    return _div
  }
  
  private makeStyles(): HTMLElement {
    const styles: HTMLElement = document.createElement('style')
    styles.setAttribute('type', 'text/css')
    styles.appendChild(document.createTextNode(STYLES))
    return styles
  }
  
  private update(trans: TranslatorEvent): void {
    const SAFE_MARGIN: number = 30
    const position: any = trans.position
    let nextX: number = position.x + 15
    let nextY: number = position.y + 25
    const { height, width } = this.el.getClientRects()[0]
    
    if (nextX + width + SAFE_MARGIN > document.documentElement.clientWidth) {
      nextX = nextX - (nextX + width + SAFE_MARGIN - document.documentElement.clientWidth)
    }
    if (nextY + height + SAFE_MARGIN > document.documentElement.clientHeight) {
      nextY = nextY - height - SAFE_MARGIN - 25
    }
    this.el.innerHTML = Card.makeTemplate(trans)
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

