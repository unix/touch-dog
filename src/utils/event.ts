export type EventHubListener = {
  (evt: Event, detail?: any): void,
}
export type EventRecord = {
  type: string,
  handle: EventHubListener,
  done: EventListener,
}

export class EventHub {
  
  private source: Text
  private eventRecords: EventRecord[] = []
  
  constructor() {
    this.source = document.createTextNode('')
  }
  
  dispath(eventType: string, detail?: any): void {
    const event: CustomEvent = new CustomEvent(eventType,
      Object.assign({
        bubbles: true,
        cancelable: true,
      }, { detail }))
    this.source.dispatchEvent(event)
  }
  
  listen(eventType: string, done: EventHubListener): void {
    const handle = (e: any) => done(e, e.detail)
    const record: EventRecord = this.eventRecords.find(record => {
      return record.type === eventType && record.done === done
    })
    if (!!record) return
    this.source.addEventListener(eventType, handle)
    this.eventRecords.push({ type: eventType, handle, done })
  }
  
  remove(eventType: string, done?: EventHubListener): void {
    // just remove one
    if (done) return this.removeOne(eventType, done)
    // remove this type
    this.eventRecords
      .filter(re => re.type === eventType)
      .forEach(re => this.source.removeEventListener(re.type, re.handle))
  }
  
  removeAll(): void {
    this.eventRecords
      .forEach(re => this.source.removeEventListener(re.type, re.handle))
  }
  
  private removeOne(eventType: string, done?: EventHubListener): void {
    const record: EventRecord = this.eventRecords.find(record => {
      return record.type === eventType && record.done === done
    })
    if (!record) return
    this.source.removeEventListener(eventType, record.handle)
  }
  
}
