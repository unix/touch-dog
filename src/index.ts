import { Touch } from './instance'
import { EventHub } from './event'


;(async() => {
  if (!document) return
  new Touch(new EventHub())
  
})()






