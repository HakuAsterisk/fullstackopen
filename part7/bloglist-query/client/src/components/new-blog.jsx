import { useNavigate } from 'react-router-dom'
import { useBlogs } from '../hooks/useBlogs'
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
import PostAddIcon from '@mui/icons-material/PostAdd'

const NewBlog = () => {
  const { addBlog } = useBlogs()
  const { dispatch } = useNotification()
  const navigate = useNavigate()

  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('text', 'url')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      await addBlog({
        title: title.inputProps.value,
        author: author.inputProps.value,
        url: url.inputProps.value,
      })
      dispatch({
        type: 'set_notif',
        message: `Created ${title}`,
        isSuccess: true,
      })
      title.reset()
      author.reset()
      url.reset()
      navigate('/')
    } catch (error) {
      dispatch({
        type: 'set_notif',
        message: `Error creating the blog (${error.response?.status}: ${error.response?.data?.error})`,
        isSuccess: false,
      })
    }
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
            <PostAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a new blog
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleNewBlog} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            placeholder="Blog title"
            autoFocus
            {...title.inputProps}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="author"
            label="Author"
            placeholder="Blog author"
            {...author.inputProps}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="url"
            label="Url"
            placeholder="Blog url"
            {...url.inputProps}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
          >
            Create
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default NewBlog
