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

  // Example validation
  if (username === 'admin' && password === '1234') {
    return 'Login successful' 
  } else {
    return 'Invalid username or password'
  }
})

ipcMain.handle('getStudents', async (_, gradeYear: { gradeId: string}) => {
  const { gradeId } = gradeYear
  
  const sampledata = [
      "grade_1",
      "grade_2",
      "grade_3",
      "grade_4",
      "grade_5",
    ]

  // Example validation
  const validGrade = sampledata.includes(gradeId)
  if (!validGrade){
    return 
    }
      return `returned: ${gradeId}`
  })
