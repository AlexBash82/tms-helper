// public/electron/preload.js

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
  ipcRenderer,

  writeOneUser: async (data) => ipcRenderer.invoke('write-one-user', data),
  getAllUsers: async () => ipcRenderer.invoke('read-all-users'),
  getUsersByLastname: async (data) =>
    ipcRenderer.invoke('search-users-by-lastname', data),
  getUsersByLatest: async () =>
    ipcRenderer.invoke('get-sortet-users-by-litest'),
  updateOneUser: async (data) => ipcRenderer.invoke('update-one-user', data),
  deleteOneUser: async (lastFirstName) =>
    ipcRenderer.invoke('delete-one-user', lastFirstName),
})
