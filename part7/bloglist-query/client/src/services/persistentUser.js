import loginService from './login'

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem('appUser')
  if (loggedUserJSON) {
    const savedUser = JSON.parse(loggedUserJSON)
    return savedUser
  } else {
    return null
  }
}

const saveUser = async (loginData) => {
  try {
    const user = await loginService.login({ ...loginData })
    window.localStorage.setItem('appUser', JSON.stringify(user))
    return user
  } catch {
    throw new Error('Invalid username or password')
  }
}

const removeUser = () => {
  window.localStorage.removeItem('appUser')
}

export default { getUser, saveUser, removeUser }
