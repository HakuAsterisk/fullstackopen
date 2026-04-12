import Blog from './blog'

const BlogList = ({ blogs, user, handleLike, handleDelete }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return (
    <div style={{ marginBottom: 8 }}>
      <h2>blogs</h2>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  )
}

export { BlogList as default }
