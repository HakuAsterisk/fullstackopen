import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewBlog = ({ handleNotif, handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

  const addBlog = async (event) => {
    event.preventDefault()
    await handleNewBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    navigate('/')
  }

  const inputMargin = {
    marginLeft: 8,
    marginBottom: 8,
  }

  return (
    <>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <label>
          Title
          <input
            style={inputMargin}
            type='text'
            value={title}
            placeholder='Blog title'
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <br />
        <label>
          Author
          <input
            style={inputMargin}
            type='text'
            value={author}
            placeholder='Blog author'
            onChange={(event) => setAuthor(event.target.value)}
          />
        </label>
        <br />
        <label>
          Url
          <input
            style={inputMargin}
            type='text'
            value={url}
            placeholder='Blog url'
            onChange={(event) => setUrl(event.target.value)}
          />
        </label>
        <br />
        <button type='submit'>Create</button>
      </form>
    </>
  )
}

export default NewBlog
