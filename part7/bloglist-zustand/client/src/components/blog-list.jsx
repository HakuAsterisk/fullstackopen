import { Link } from 'react-router-dom'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Stack,
} from '@mui/material'
import { useBlogs } from '../stores/blog-store'

const BlogList = () => {
  const blogs = useBlogs()
  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 3, px: 2 }}>
      <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
        Blogs!
      </Typography>
      <Stack spacing={2}>
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            elevation={2}
            sx={{
              borderRadius: 2,
              transition: 'transform 0.15s, box-shadow 0.15s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 6,
              },
            }}
          >
            <CardActionArea
              component={Link}
              to={`/blogs/${blog.id}`}
              sx={{ p: 1 }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="h6" component="div">
                  {blog.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </Box>
  )
}

export default BlogList
