import { useState, useEffect } from 'react'
import Blog from './components/blog'
import blogService from './services/blogs'
import LoginForm from './components/login-form'
import loginService from './services/login'
import Notification from './components/notification'
import NewBlog from './components/new-blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(true)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('appUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('appUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      handleNotif('Login succesful!', true)
    } catch {
      handleNotif('Wrong username or password', false)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('appUser')
    setUser(null)
    handleNotif('Logout succesful!', true)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }

    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      handleNotif(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added!`,
        true,
      )
    } catch (error) {
      handleNotif(`Creating a new blog failed! (${error.status})`, false)
    }
  }

  const handleNotif = (message, type) => {
    setMessage(message)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <>
      {message && <Notification message={message} type={messageType} />}
      {!user &&
        LoginForm(handleLogin, username, password, setUsername, setPassword)}
      {user && (
        <div>
          <div>
            <p>{user.name} logged in</p>
            <button
              onClick={() => {
                handleLogout()
              }}
            >
              logout
            </button>
          </div>
          <div>
            <h2>blogs</h2>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
          <div>
            <h2>Create a new blog</h2>
            {NewBlog(
              handleNewBlog,
              title,
              author,
              url,
              setTitle,
              setAuthor,
              setUrl,
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default App
