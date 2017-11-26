import { Touch } from './instance'
import { EventHub } from './pool/event'
import { MouseHub } from './pool/mouse'
import { Card } from './pool/card'
import { store } from './utils/page'

;(async() => {
  if (!document) return
  const touchStatus = (await store.find('touchStatus')).touchStatus || 'select'
  const hub: EventHub = new EventHub()
  new MouseHub(hub, touchStatus)
  new Card(hub)
  new Touch(hub)
  
})()






