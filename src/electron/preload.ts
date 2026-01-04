import { contextBridge, ipcRenderer } from 'electron'
//
// contextBridge.exposeInMainWorld('api', {
//   hello: () => 'Hello from Electron'
// })

interface UpdateGradeArgs {
  studentId: number
  subject: string
  quarter: 1 | 2 | 3 | 4
  grade: number | null
}
contextBridge.exposeInMainWorld('api', {
  login: (credentials: {username: string, password: string}) => ipcRenderer.invoke('login', credentials),
  getStudents: (gradeYear: {gradeId: string}) => ipcRenderer.invoke('getStudents', gradeYear),
  getStudentGrades: (studentId: number) => ipcRenderer.invoke('getStudentGrades', studentId),
  updateAllStudentGrades: (studentData: {studentId: number  ,grades: string[]}) => ipcRenderer.invoke('updateAllStudentGrades'),
  updateStudentGrade: (args: UpdateGradeArgs) => ipcRenderer.invoke('updateStudentGrade', args) // ✅ REQUIRED)
})


