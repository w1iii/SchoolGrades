import { contextBridge, ipcRenderer } from 'electron'
//
// contextBridge.exposeInMainWorld('api', {
//   hello: () => 'Hello from Electron'
// })

contextBridge.exposeInMainWorld('api', {
  login: (credentials: {username: string, password: string}) => ipcRenderer.invoke('login', credentials)
})

