import { Alert, Box } from '@mui/material'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
      <Alert
        severity={type ? 'success' : 'error'}
        variant='filled'
        sx={{ width: '100%', maxWidth: 600 }}
        className='notification'
      >
        {message}
      </Alert>
    </Box>
  )
}

export default Notification
