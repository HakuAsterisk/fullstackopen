import { Alert, Box } from '@mui/material'
import { useNotification } from '../hooks/useNotification'

const Notification = () => {
  const { state } = useNotification()
  if (state.message === null) {
    return null
  }

  return (
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
      <Alert
        severity={state.isSuccess ? 'success' : 'error'}
        variant="filled"
        sx={{ width: '100%', maxWidth: 600 }}
        className="notification"
      >
        {state.message}
      </Alert>
    </Box>
  )
}

export default Notification
