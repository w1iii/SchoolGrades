import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const result = await window.api.login({ username: username, password: password })
    if(result === "Login successful"){
      navigate('/dashboard')
    }
    console.log(result) // "Login successful" or "Invalid username/password"
  }
  return(
    <>
      <h1> login </h1>
      <input id="username" type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input id="password" type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={handleLogin}>
        Submit
      </button>
    </>
  )
}
