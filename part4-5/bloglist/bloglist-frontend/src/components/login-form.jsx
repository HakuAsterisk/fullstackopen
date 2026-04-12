import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const logIn = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={logIn}>
      <div>
        <label>
          Username
          <input
            style={{ margin: 8 }}
            type='text'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>
          Password
          <input
            style={{ marginLeft: 8 }}
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm
