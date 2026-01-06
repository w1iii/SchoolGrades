
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

export default function Navbar(props:any){
  const title = props.gradeYear
  const navigate = useNavigate()

  const handleReturn = () => {
    navigate('/dashboard')
  }
  return(
  <>
      <div className="navbar-container">
        {props.isStudents ? <h1>LogoTCS</h1> : <p className="return" onClick={handleReturn}> return </p>}
        {title !== null ? <h2> Grade {title} </h2> : <h2></h2>}
        <p> Logout </p>
      </div>
  </>
  )
}
