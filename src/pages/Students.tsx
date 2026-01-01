
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../components/Navbar.tsx'

export default function Students() {
  const { gradeYear } = useParams<{ gradeYear: string }>()

  useEffect(() => {
    if (gradeYear) {
      const res = window.api.getStudents({ gradeId: `grade_${gradeYear}` })
      console.log(res)
    }
  }, [gradeYear])

  return (
    <>
      <Navbar />
      <div>Students for Grade {gradeYear}</div>
    </>
  )
}
