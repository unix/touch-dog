
export const findSelectdText = (): string => {
  return `${window.getSelection()}`
}

export const store = {
  find: async(key: string): Promise<any> => {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, (items: any) => {
        resolve(items)
      })
    })
  },
  
  remove: async(key: string): Promise<any> => {
    return new Promise((resolve) => {
      chrome.storage.sync.remove(key, () => {
        resolve()
      })
    })
  },
  
  create: async(items: any): Promise<any> => {
    return new Promise((resolve) => {
      chrome.storage.sync.get(items, () => {
        resolve()
      })
    })
  },
}

