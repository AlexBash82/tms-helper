// public/electron/preload.js

//const { ipcRenderer } = require('electron')

// window.api = {
//   send: (channel, data) => {
//     if (ipcRenderer && ipcRenderer.send) {
//       ipcRenderer.send(channel, data)
//     }
//   },
//   receive: (channel, func) => {
//     if (ipcRenderer && ipcRenderer.on) {
//       ipcRenderer.on(channel, (event, ...args) => func(...args))
//     }
//   },
//   ipcRenderer,
//   readAllDatabase: async () => ipcRenderer.invoke('read-all'),
//   writeDatabase: async (data) => ipcRenderer.invoke('write-file', data),
//   updateItem: async (data) => ipcRenderer.invoke('update-item', data),
// }

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
  ipcRenderer,
  readAllDatabase: async () => ipcRenderer.invoke('read-all'),
  writeDatabase: async (data) => ipcRenderer.invoke('write-file', data),
  updateItem: async (data) => ipcRenderer.invoke('update-item', data),
  searchUsersByLastname: async (data) =>
    ipcRenderer.invoke('search-users-by-lastname', data),
})
