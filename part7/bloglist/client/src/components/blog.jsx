import { useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Link as MuiLink,
  Divider,
} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import DeleteIcon from '@mui/icons-material/Delete'
import PersonIcon from '@mui/icons-material/Person'
import LinkIcon from '@mui/icons-material/Link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const Blog = ({ blog, user, handleNotif, handleDelete, handleLike }) => {
  const navigate = useNavigate()

  if (!blog) {
    return null
  }

  const canDelete = user && blog.user[0].id === user.id

  const likeBlog = () => {
    handleLike({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    })
  }

  const deleteBlog = async () => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      await handleDelete(blog.id)
      navigate('/')
    } else {
      return
    }
  }

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 3, px: 2 }}>
      <Card elevation={3} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant='h4' component='h2' sx={{ mb: 1 }}>
            {blog.title}
          </Typography>
          <Typography variant='subtitle1' color='text.secondary' sx={{ mb: 3 }}>
            by {blog.author}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant='h6' component='span'>
                {blog.likes}
              </Typography>
              {!user ? (
                <Typography variant='body1' color='text.secondary'>
                  Likes
                </Typography>
              ) : (
                <Button
                  variant='contained'
                  size='small'
                  startIcon={<ThumbUpIcon />}
                  onClick={likeBlog}
                >
                  Like
                </Button>
              )}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LinkIcon color='action' />
              <MuiLink
                href={blog.url}
                target='_blank'
                rel='noopener noreferrer'
                underline='hover'
              >
                {blog.url}
              </MuiLink>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon color='action' />
              <Typography variant='body2' color='text.secondary'>
                Added by {blog.user[0].username}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button
              variant='outlined'
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
            >
              Back
            </Button>
            {canDelete && (
              <Button
                variant='outlined'
                color='error'
                startIcon={<DeleteIcon />}
                onClick={deleteBlog}
              >
                Delete
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Blog
