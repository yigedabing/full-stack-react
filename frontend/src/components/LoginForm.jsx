import { useState } from 'react'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    login({ username, password })
  }

  return (
    <form onSubmit={handleLogin} className="loginForm">
      <input
        type="text"
        id="username"
        value={username}
        placeholder="用户名"
        onChange={({ target }) => setUsername(target.value)}
      />
      <input
        type="text"
        id="password"
        value={password}
        placeholder="密码"
        onChange={({ target }) => setPassword(target.value)}
      />
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
