import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/login-form'
import loginService from './services/login'
import Notification from './components/notification'
import NewBlog from './components/new-blog'
import Toggle from './components/toggle'
import BlogList from './components/blog-list'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(true)

  const blogFormRef = useRef()

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

  const handleLogin = async (loginData) => {
    try {
      const user = await loginService.login({ ...loginData })
      window.localStorage.setItem('appUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
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

  const handleNewBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(returnedBlog))
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

  const handleLike = async (blog) => {
    try {
      const updatedBlog = await blogService.updateBlog(blog)
      setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)))
    } catch (error) {
      handleNotif(`Liking the blog failed! (${error.status})`, false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter((b) => b.id !== id))
      handleNotif('Blog deleted!', true)
    } catch (error) {
      handleNotif(`Deleting the blog failed! (${error.status})`, false)
    }
  }

  return (
    <>
      {message && <Notification message={message} type={messageType} />}
      {!user && (
        <Toggle closedLabel='log in' openLabel='cancel'>
          <LoginForm handleLogin={handleLogin} />
        </Toggle>
      )}
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
          <BlogList
            blogs={blogs}
            user={user}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
          <div>
            <Toggle closedLabel='New blog' openLabel='Cancel' ref={blogFormRef}>
              <NewBlog handleNewBlog={handleNewBlog} />
            </Toggle>
          </div>
        </div>
      )}
    </>
  )
}

export default App
