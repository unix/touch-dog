import { Touch } from './instance'
import { EventHub } from './utils/event'
import { MouseHub } from './utils/mouse'


;(async() => {
  if (!document) return
  const hub: EventHub = new EventHub()
  new MouseHub(hub)
  new Touch(hub)
  
  
})()






