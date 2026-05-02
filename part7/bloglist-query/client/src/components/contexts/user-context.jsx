import { createContext, useState, useEffect } from 'react'
import { useNotification } from '../../hooks/useNotification'
import loginService from '../../services/login'
import blogService from '../../services/blogs'

const UserContext = createContext()

export default UserContext

export const UserContextProvider = (props) => {
  const { dispatch } = useNotification()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('appUser')
    if (loggedUserJSON) {
      const savedUser = JSON.parse(loggedUserJSON)
      setUser(savedUser)
      blogService.setToken(savedUser.token)
    }
  }, [])

  const login = async (loginData) => {
    try {
      const user = await loginService.login({ ...loginData })
      window.localStorage.setItem('appUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch {
      throw new Error('Invalid username or password')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('appUser')
    blogService.setToken(null)
    setUser(null)
    dispatch({
      type: 'set_notif',
      message: 'Logout successful!',
      isSuccess: true,
    })
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {props.children}
    </UserContext.Provider>
  )
}
