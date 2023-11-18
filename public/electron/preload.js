// public/electron/preload.js

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
  deleteUser: async (lastFirstName) =>
    ipcRenderer.invoke('delete-item', lastFirstName),
})
