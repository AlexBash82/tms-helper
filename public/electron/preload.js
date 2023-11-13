// public/electron/preload.ts

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  readAllDatabase: async () => {
    return await ipcRenderer.invoke('read-all')
  },

  writeDatabase: async (data) => {
    return await ipcRenderer.invoke('write-file', data)
  },

  updateItem: async (data) => {
    return await ipcRenderer.invoke('update-item', data)
  },
})
