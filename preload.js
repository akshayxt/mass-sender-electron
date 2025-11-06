const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  onQR: (fn) => ipcRenderer.on('wa-qr', (e, data) => fn(data)),
  onReady: (fn) => ipcRenderer.on('wa-ready', () => fn()),
  onProfile: (fn) => ipcRenderer.on('wa-profile', (e, data) => fn(data)),
  onAuth: (fn) => ipcRenderer.on('wa-auth', () => fn()),
  onAuthFail: (fn) => ipcRenderer.on('wa-auth-failure', (e, data) => fn(data)),
  importCsv: (path) => ipcRenderer.invoke('import-csv', path),
  sendBulk: (opts) => ipcRenderer.invoke('send-bulk', opts),
  getProfile: () => ipcRenderer.invoke('get-profile'),
  onProgress: (fn) => ipcRenderer.on('send-progress', (e, data) => fn(data))
});
