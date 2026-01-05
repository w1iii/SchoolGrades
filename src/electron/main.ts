import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs')
    }
  })
  // Load React dev server
  win.loadURL('http://localhost:5173')
}

app.whenReady().then(createWindow)

ipcMain.handle('login', async (_, credentials: { username: string; password: string }) => {
  const { username, password } = credentials
  if (username === 'admin' && password === '1234') {
    return true 
  } else {
    return false
  }
})

interface Grade{
  subject:string
  quarter1: number
  quarter2: number
  quarter3: number
  quarter4: number
}

interface StudentGradesData {
  student_id: number
  first_name: string
  last_name: string
  grades: Grade[]
}

// Student and grades data
const allStudentGrades: Record<number, StudentGradesData> = {
  1: {
    student_id: 1,
    first_name: 'John',
    last_name: 'Smith',
    grades: [
      { subject: 'Math', quarter1: 85, quarter2: 88, quarter3: 90, quarter4: 87 },
      { subject: 'English', quarter1: 78, quarter2: 82, quarter3: 80, quarter4: 81 },
      { subject: 'Science', quarter1: 92, quarter2: 89, quarter3: 95, quarter4: 92 },
      { subject: 'History', quarter1: 80, quarter2: 83, quarter3: 85, quarter4: 83 },
      { subject: 'PE', quarter1: 88, quarter2: 90, quarter3: 89, quarter4: 89 },
      { subject: 'Art', quarter1: 91, quarter2: 93, quarter3: 92, quarter4: 92 },
    ]
  },
  2: {
    student_id: 2,
    first_name: 'Maria',
    last_name: 'Garcia',
    grades: [
      { subject: 'Math', quarter1: 75, quarter2: 78, quarter3: 82, quarter4: 80 },
      { subject: 'English', quarter1: 88, quarter2: 90, quarter3: 92, quarter4: 91 },
      { subject: 'Science', quarter1: 80, quarter2: 82, quarter3: 84, quarter4: 83 },
      { subject: 'History', quarter1: 85, quarter2: 87, quarter3: 89, quarter4: 88 },
      { subject: 'PE', quarter1: 92, quarter2: 94, quarter3: 93, quarter4: 95 },
      { subject: 'Art', quarter1: 88, quarter2: 89, quarter3: 87, quarter4: 88 },
    ]
  },
  3: {
    student_id: 3,
    first_name: 'Ahmed',
    last_name: 'Hassan',
    grades: [
      { subject: 'Math', quarter1: 92, quarter2: 94, quarter3: 96, quarter4: 95 },
      { subject: 'English', quarter1: 85, quarter2: 86, quarter3: 87, quarter4: 88 },
      { subject: 'Science', quarter1: 88, quarter2: 91, quarter3: 93, quarter4: 92 },
      { subject: 'History', quarter1: 90, quarter2: 92, quarter3: 91, quarter4: 93 },
      { subject: 'PE', quarter1: 80, quarter2: 82, quarter3: 83, quarter4: 81 },
      { subject: 'Art', quarter1: 85, quarter2: 84, quarter3: 86, quarter4: 85 },
    ]
  }
}

ipcMain.handle('getStudents', async (_, { gradeId }) => {
  // Return list of students (without grades)
  return Object.values(allStudentGrades).map(student => ({
    id: student.student_id,
    first_name: student.first_name,
    last_name: student.last_name
  }))
})

ipcMain.handle('getStudentGrades', async (_, { studentId }) => {
  // Return grades for specific student
  const student = allStudentGrades[studentId]
  if (student) {
    return student.grades
  }
  return []
})

ipcMain.handle(
  'updateAllStudentGrades',
  async (_, { studentId, grades }) => {
    console.log('SAVE ALL GRADES')
    console.log('Student ID:', studentId)
    console.table(grades)
    return true
  }
)

ipcMain.handle(
  'updateStudentGrade',
  async (_, { studentId, subjectIndex, quarter, value }) => {
    console.log('SAVE SINGLE GRADE')
    console.log({
      studentId,
      subjectIndex,
      quarter,
      value,
    })
    return true
  }
)
