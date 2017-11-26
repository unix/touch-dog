import { Touch } from './instance'
import { EventHub, Card, MouseHub} from './pool'
import { store } from './utils/page'

;(async() => {
  if (!document) return
  const touchStatus = (await store.find('touchStatus')).touchStatus || 'select'
  const hub: EventHub = new EventHub()
  
  new MouseHub(hub, touchStatus)
  new Card(hub)
  new Touch(hub)
})()






