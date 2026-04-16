import { useNavigate } from 'react-router-dom'

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

  const paragraph = {
    padding: 0,
    margin: 0,
  }

  return (
    <>
      <div
        style={{
          border: '1px solid black',
          padding: 8,
          marginBottom: 8,
        }}
      >
        <h2 style={paragraph}>
          {blog.author}: {blog.title}
        </h2>
        <div>
          <p style={paragraph}>
            {blog.likes}{' '}
            {!user ? (
              <span>Likes</span>
            ) : (
              <button onClick={likeBlog}>Like</button>
            )}
          </p>
          <a href={blog.url} target='_blank' style={paragraph}>
            {blog.url}
          </a>
          <p style={paragraph}>Added by: {blog.user[0].username}</p>
          {canDelete && <button onClick={deleteBlog}>Delete</button>}
        </div>
      </div>
    </>
  )
}
export default Blog
