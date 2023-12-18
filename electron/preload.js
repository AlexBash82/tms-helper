// electron/preload.js

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
  ipcRenderer,

  writeOneUser: async (personData) =>
    ipcRenderer.invoke('write-one-user', personData),
  getAllUsers: async () => ipcRenderer.invoke('read-all-users'),
  getUsersByLastname: async (data) =>
    ipcRenderer.invoke('get-sorted-users-by-lastname', data),
  getUsersByLatest: async (addParam) =>
    ipcRenderer.invoke('get-sorted-users-by-latest', addParam),
  getOneUserByLFName: async (LFName) =>
    ipcRenderer.invoke('get-one-user-by-lfname', LFName),
  updateOneUser: async (data) => ipcRenderer.invoke('update-one-user', data),
  editOneUser: async (data) => ipcRenderer.invoke('edit-one-user', data),
  deleteOneUser: async (lastFirstName) =>
    ipcRenderer.invoke('delete-one-user', lastFirstName),

  writeNewWeek: async (weekData) =>
    ipcRenderer.invoke('write-new-week', weekData),
  getOneWeek: async (dateOfMeet) =>
    ipcRenderer.invoke('get-one-week', dateOfMeet),
  getAllWeeks: async () => ipcRenderer.invoke('get-all-weeks'),
  updateOneWeek: async (weekData) =>
    ipcRenderer.invoke('update-one-week', weekData),
})
