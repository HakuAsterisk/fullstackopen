import { Alert, Box } from '@mui/material'
import { useNotificationStore } from '../stores/notification-store'

const Notification = () => {
  const notification = useNotificationStore((state) => state.notification)

  if (notification === null) {
    return null
  }

  return (
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
      <Alert
        severity={'info'}
        variant="filled"
        sx={{ width: '100%', maxWidth: 600 }}
        className="notification"
      >
        {notification}
      </Alert>
    </Box>
  )
}

export default Notification
