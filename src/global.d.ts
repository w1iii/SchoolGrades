
export {}

declare global {
  interface Student {
    id: number
    last_name: string
    first_name: string
  }
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

  interface Window {
    api: {
      login: (credentials: {
        username: string
        password: string
      }) => Promise<string>

      getStudents: (args: {
        gradeId: string
      }) => Promise<Student[]>

      getStudentGrades: (args: {
        studentId: number
      }) => Promise<Grade[]>
    }
  }
}
