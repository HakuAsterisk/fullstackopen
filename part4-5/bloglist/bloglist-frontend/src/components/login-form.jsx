const LoginForm = (
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          Username
          <input
            style={{ margin: 8 }}
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
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
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm
