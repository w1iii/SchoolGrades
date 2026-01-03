
import './Navbar.css'

interface NavbarProps{
  gradeYear?: string
}

export default function Navbar({gradeYear}: NavbarProps){
  const title = gradeYear
  return(
  <>
      <div className="navbar-container">
        <h1>LogoTCS</h1>
        {title !== null ? <h2> Grade {title} </h2> : <h2>Grades</h2>}
        <p> Logout </p>
      </div>
  </>
  )
}
