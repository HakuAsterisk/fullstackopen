import { useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { useNotification } from '../hooks/useNotification'
import { useField } from '../hooks/useField'
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

const LoginForm = () => {
  const { login } = useUser()
  const { dispatch } = useNotification()
  const navigate = useNavigate()

  const username = useField('text', 'username')
  const password = useField('password', 'password')

  const logIn = async (event) => {
    try {
      event.preventDefault()
      await login({
        username: username.inputProps.value,
        password: password.inputProps.value,
      })
      dispatch({
        type: 'set_notif',
        message: 'Login successful!',
        isSuccess: true,
      })
      navigate('/')
    } catch (error) {
      dispatch({
        type: 'set_notif',
        message: error.message,
        isSuccess: false,
      })
    }
    username.reset()
    password.reset()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Box>

        <Box component="form" onSubmit={logIn} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoComplete="username"
            autoFocus
            {...username.inputProps}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            {...password.inputProps}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default LoginForm
