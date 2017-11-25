import { Touch } from './instance'
import { EventHub } from './pool/event'
import { MouseHub } from './pool/mouse'
import { Card } from './pool/card'

;(async() => {
  if (!document) return
  const hub: EventHub = new EventHub()
  new MouseHub(hub)
  new Card(hub)
  new Touch(hub)
  
})()






