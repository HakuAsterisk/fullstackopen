import { useState, useEffect } from 'react'
import { Routes, Route, Link, useMatch } from 'react-router-dom'

import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/login-form'
import Notification from './components/notification'
import NewBlog from './components/new-blog'
import BlogList from './components/blog-list'
import Blog from './components/blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
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

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

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
      const returnedBlog = await blogService.createBlog(newBlog)
      handleNotif(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added!`,
        true,
      )
      setBlogs(blogs.concat(returnedBlog))
    } catch (error) {
      handleNotif(`Creating a new blog failed! (${error.status})`, false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await blogService.deleteBlog(id)
      handleNotif('Blog deleted!', true)
      setBlogs(blogs.filter((b) => b.id !== id))
    } catch (error) {
      handleNotif(`Deleting the blog failed! (${error.status})`, false)
    }
  }

  const handleLike = async (blog) => {
    try {
      const updatedBlog = await blogService.updateBlog(blog)
      setBlogs(blogs.map((b) => (b.id !== blog.id ? b : updatedBlog)))
    } catch (error) {
      handleNotif(`Liking the blog failed! (${error.status})`, false)
    }
  }

  const handleNotif = (message, type) => {
    setMessage(message)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const padding = {
    padding: 5,
  }
  const match = useMatch('/blogs/:id')
  const blog = match
    ? sortedBlogs.find((blog) => blog.id === match.params.id)
    : null

  return (
    <div>
      <div>
        <Link style={padding} to='/'>
          Blogs
        </Link>
        {!user ? (
          <Link style={padding} to='/login'>
            Login
          </Link>
        ) : (
          <>
            <Link style={padding} to='/create'>
              New Blog
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>

      <Notification message={message} type={messageType} />

      <Routes>
        <Route
          path='/'
          element={
            <div>
              <h2>Blogs!</h2>
              <BlogList blogs={sortedBlogs} />
            </div>
          }
        />
        <Route
          path='/login'
          element={<LoginForm handleLogin={handleLogin} />}
        />
        <Route
          path='/blogs/:id'
          element={
            <Blog
              blog={blog}
              user={user}
              handleNotif={handleNotif}
              handleDelete={handleDelete}
              handleLike={handleLike}
            />
          }
        />
        <Route
          path='/create'
          element={
            <NewBlog handleNotif={handleNotif} handleNewBlog={handleNewBlog} />
          }
        />
      </Routes>
    </div>
  )
}

export default App
