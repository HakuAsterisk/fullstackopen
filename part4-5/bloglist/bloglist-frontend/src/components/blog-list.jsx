import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default BlogList
