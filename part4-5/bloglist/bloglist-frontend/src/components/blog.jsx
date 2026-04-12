import { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

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
          {blog.title}
          <button
            style={{ marginLeft: 8 }}
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide' : 'View'}
          </button>
        </div>
        {showDetails && (
          <div>
            {blog.author}
            <br />
            {blog.likes} <button onClick={likeBlog}>Like</button>
            <br />
            {blog.url}
            <br />
            {blog.user[0].username}
            <br />
            {myBlog && <button onClick={deleteBlog}>Delete Blog</button>}
          </div>
        )}
      </div>
    </>
  )
}

export default Blog
