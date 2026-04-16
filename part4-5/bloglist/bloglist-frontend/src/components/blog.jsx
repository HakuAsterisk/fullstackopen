import { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const show = { display: showDetails ? '' : 'none' }

  const myBlog = blog.user[0].id === user.id

  const deleteBlog = () => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog.id)
    } else {
      return
    }
  }

  const likeBlog = () => {
    handleLike({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    })
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
        <div
          style={{
            display: 'flex',
          }}
        >
          <p style={{ padding: 0, margin: 0 }}>{blog.title}</p>
          <button
            style={{ marginLeft: 8 }}
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide' : 'View'}
          </button>
        </div>
        {blog.author}
        <div style={show}>
          <p style={{ padding: 0, margin: 0 }}>
            {blog.likes} <button onClick={likeBlog}>Like</button>
          </p>
          <p style={{ padding: 0, margin: 0 }}>{blog.url}</p>
          <p style={{ padding: 0, margin: 0 }}>{blog.user[0].username}</p>
          {myBlog && <button onClick={deleteBlog}>Delete Blog</button>}
        </div>
      </div>
    </>
  )
}

export default Blog
