import { contextBridge, ipcRenderer } from 'electron'
//
// contextBridge.exposeInMainWorld('api', {
//   hello: () => 'Hello from Electron'
// })

contextBridge.exposeInMainWorld('api', {
  login: (credentials: {username: string, password: string}) => ipcRenderer.invoke('login', credentials),
  getStudents: (gradeYear: {gradeId: string}) => ipcRenderer.invoke('getStudents', gradeYear),
  getStudentGrades: (studentId: number) => ipcRenderer.invoke('getStudentGrades', studentId)
})


