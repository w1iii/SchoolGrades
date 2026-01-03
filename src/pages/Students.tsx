import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar.tsx'
import './Students.css'

interface Student {
  id: number
  last_name: string
  first_name: string
}

interface Grade {
  subject: string
  quarter1: number | null
  quarter2: number | null
  quarter3: number | null
  quarter4: number | null
}

export default function Students() {
  const { gradeYear } = useParams<{ gradeYear: string }>()
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [studentGrades, setStudentGrades] = useState<Grade[]>([])

  useEffect(() => {
    if (!gradeYear) return
    const fetchStudents = async () => {
      const res = await window.api.getStudents({
        gradeId: `grade_${gradeYear}`,
      })
      setStudents(res)
    }
    fetchStudents()
  }, [gradeYear])

  const handleStudentClick = async (student: Student) => {
    setSelectedStudent(student)
    const grades = await window.api.getStudentGrades({ studentId: student.id })
    setStudentGrades(grades)
  }

  const calculateAverage = (grade: Grade): number => {
    const grades = [grade.quarter1, grade.quarter2, grade.quarter3, grade.quarter4].filter(
      (g) => g !== null
    )
    if (grades.length === 0) return 0
    return Math.round((grades.reduce((a, b) => a + b, 0) / grades.length) * 10) / 10
  }

  return (
    <>
      <Navbar gradeYear = {gradeYear}/>
      <div className="students-container">
        <div className="students-sidebar">

          {/* INPUT AREA -- SEARCH STUDENT*/}
          <div className="searchbar-container">
            <input className="searchbar" type='text'/>
            <button>search</button>
          </div>

          <div className="students-content">
            {/* Left Sidebar - Student List */}
            <div className="student-list">
              {students.map((student) => (
                <div
                  key={student.id}
                  onClick={() => handleStudentClick(student)}
                  className={`student-item ${selectedStudent?.id === student.id ? 'active' : ''}`}
                >
                  {student.last_name}, {student.first_name}
                </div>
              ))}
            </div>
          </div>
        </div>

          {/* Right Content - Grades Table */}
        <div className="grades-container">
            {selectedStudent ? (
              <div className="grades-main-content">
                <h2>
                  {selectedStudent.last_name}, {selectedStudent.first_name}
                </h2>

                {/* Grades Table */}
                <div className="grades-table-wrapper">
                  <table className="grades-table">
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>Avg</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentGrades.map((grade, idx) => (
                        <tr key={idx}>
                          <td>{grade.subject}</td>
                          <td>{grade.quarter1 ?? '-'}</td>
                          <td>{grade.quarter2 ?? '-'}</td>
                          <td>{grade.quarter3 ?? '-'}</td>
                          <td>{grade.quarter4 ?? '-'}</td>
                          <td className="average">{calculateAverage(grade)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <p>Select a student to view grades</p>
              </div>
            )}
          </div>
        </div>
    </>
  )
}
