import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const logIn = async (event) => {
    event.preventDefault()
    await handleLogin({ username, password })
    setUsername('')
    setPassword('')
    navigate('/')
  }

  const inputMargin = {
    marginBottom: 8,
    marginLeft: 8,
  }

  return (
    <form onSubmit={logIn} style={{ marginTop: 8 }}>
      <label>
        Username
        <input
          style={inputMargin}
          type='text'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <br />
      <label>
        Password
        <input
          style={inputMargin}
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm
