import { Routes, Route, Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Typography,
} from '@mui/material'
import { ErrorBoundary } from 'react-error-boundary'
import { useUser } from './hooks/useUser'
import { useNotification } from './hooks/useNotification'

import LoginForm from './components/login-form'
import Notification from './components/notification'
import NewBlog from './components/new-blog'
import BlogList from './components/blog-list'
import Blog from './components/blog'
import UserList from './components/user-list'
import User from './components/user'

const App = () => {
  const { user, logout } = useUser()
  const { dispatch } = useNotification()

  const handleLogout = () => {
    logout()
    dispatch({
      type: 'set_notif',
      message: 'Logout successful!',
      isSuccess: true,
    })
  }

  const navButtonSx = {
    bgcolor: 'primary.dark',
    '&:hover': { bgcolor: 'primary.800' },
  }

  return (
    <>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
            <Typography variant="h4" component="h2" underline="hover">
              <Link to="/" underline="always" style={{ color: 'inherit' }}>
                Blogs!
              </Link>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {user && (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/create"
                  sx={navButtonSx}
                >
                  New Blog
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/users"
                  sx={navButtonSx}
                >
                  Users
                </Button>
              </>
            )}
            {!user ? (
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={navButtonSx}
              >
                Login
              </Button>
            ) : (
              <Button color="inherit" onClick={handleLogout} sx={navButtonSx}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Container>
        <Notification />
        <ErrorBoundary
          fallback={
            <>
              <h2>Something went wrong! :(</h2>
              <h4>Try again sometime later or ping me @somerandomhandle</h4>
            </>
          }
        >
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <BlogList />
                </div>
              }
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/create" element={<NewBlog />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<User />} />
            <Route
              path="*"
              element={
                <Box sx={{ mt: 5, textAlign: 'center' }}>
                  <h2>404 - Not Found</h2>
                  <p>The page you are looking for does not exist.</p>
                  <Button variant="contained" component={Link} to="/">
                    Go to Home
                  </Button>
                </Box>
              }
            />
          </Routes>
        </ErrorBoundary>
      </Container>
    </>
  )
}

export default App
