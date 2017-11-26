;(async() => {
  const updateIcon = (status: string): void => {
    const path: string =  `assets/images/${status === 'close' ? 'dog-disabled_38' : 'dog_38'}.png`
    chrome.browserAction.setIcon({ path })
  }
  
  const updateStatus = (index: number): void => {
    const status: string = ['close', 'select', 'zone'][index]
    chrome.tabs.getAllInWindow((tabs) => {
      Array.from((<any>tabs)).forEach(tab => {
        chrome.tabs.sendMessage((<any>tab).id, { 'touchStatus': status })
      })
    })
    chrome.storage.sync.set({ 'touchStatus': status })
    updateIcon(status)
  }
  
  const switchEl: Element = document.querySelector('.switch')
  Array.from(switchEl.children).forEach((el, index) => {
    el.addEventListener('click', () => {
      ['step1', 'step2', 'step3'].forEach(c => {
        switchEl.classList.remove(c)
      })
      switchEl.classList.add(`step${index + 1}`)
      updateStatus(index)
    })
  })
  
  chrome.storage.sync.get('touchStatus', items => {
    const status = items.touchStatus || 'select'
    const i = ['close', 'select', 'zone'].findIndex(str => str === status)
    switchEl.classList.add('dont-use-animation')
    switchEl.classList.add(`step${i + 1}`)
    
    const timer: any = setTimeout(() => {
      switchEl.classList.remove('dont-use-animation')
      clearTimeout(timer)
    }, 0)
    updateIcon(status)
  })
  
})()

