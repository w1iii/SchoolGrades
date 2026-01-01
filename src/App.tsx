import './App.css'
import { Routes, Route } from "react-router-dom"
import Login from './pages/Login.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Students from './pages/Students.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/students" element={<Students/>}/>
    </Routes>
  )
}

export default App
