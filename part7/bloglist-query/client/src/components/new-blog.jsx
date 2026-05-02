import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlogs } from '../hooks/useBlogs'
import { useNotification } from '../hooks/useNotification'
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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      await addBlog({ title, author, url })
      dispatch({
        type: 'set_notif',
        message: `Created ${title}`,
        isSuccess: true,
      })
      setTitle('')
      setAuthor('')
      setUrl('')
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
            name="title"
            placeholder="Blog title"
            autoFocus
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="author"
            label="Author"
            name="author"
            placeholder="Blog author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="url"
            label="Url"
            name="url"
            placeholder="Blog url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
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
