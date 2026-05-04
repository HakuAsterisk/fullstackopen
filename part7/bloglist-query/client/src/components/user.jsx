import { useNavigate, useMatch } from 'react-router-dom'
import { useUsers } from '../hooks/useUsers'
import { useBlogs } from '../hooks/useBlogs'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Circle from '@mui/icons-material/Circle'

const UserList = () => {
  const { getUser } = useUsers()
  const { getBlogsByUser } = useBlogs()
  const navigate = useNavigate()

  const match = useMatch('/users/:id')
  const userId = match ? match.params.id : null
  const user = getUser(userId)

  const userBlogs = getBlogsByUser(userId)
  const userLikes = userBlogs.reduce((sum, blog) => sum + blog.likes, 0)

  if (!user) {
    return null
  }

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 3, px: 2 }}>
      <Card elevation={3} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4" component="h2" sx={{ mb: 1, flexGrow: 1 }}>
              {user.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Amount of likes: {userLikes}
            </Typography>
          </Box>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
            aka. {user.username}
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
            Blogs added by user
          </Typography>
          {userBlogs.length > 0 ? (
            <List>
              {userBlogs.map((blog) => (
                <ListItem key={blog.id} disablePadding>
                  <ListItemIcon>
                    <Circle sx={{ fontSize: 12, color: grey[800] }} />
                  </ListItemIcon>
                  <ListItemText
                    variant="subtitle1"
                    primary={blog.title}
                    sx={{ m: 0, mt: 0.5 }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" color="text.secondary">
              This user has not added any blogs yet.
            </Typography>
          )}
          <Divider sx={{ my: 3 }} />
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/users')}
          >
            Back
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default UserList
