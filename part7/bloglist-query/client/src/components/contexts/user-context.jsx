import { createContext, useState, useEffect } from 'react'
import blogService from '../../services/blogs'
import userService from '../../services/persistentUser'

const UserContext = createContext()

export default UserContext

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null)
  const { getUser, saveUser, removeUser } = userService

  useEffect(() => {
    const savedUser = getUser()
    if (savedUser) {
      setUser(savedUser)
      blogService.setToken(savedUser.token)
    }
  }, [getUser])

  const login = async (loginData) => {
    try {
      const user = await saveUser(loginData)
      blogService.setToken(user.token)
      setUser(user)
    } catch {
      throw new Error('Invalid username or password')
    }
  }

  const logout = () => {
    removeUser()
    blogService.setToken(null)
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {props.children}
    </UserContext.Provider>
  )
}
