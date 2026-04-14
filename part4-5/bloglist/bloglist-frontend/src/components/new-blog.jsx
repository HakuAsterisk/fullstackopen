import { useState } from 'react'

const NewBlog = ({ handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleNewBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>Create a new blog</h2>
      <form style={{ marginBottom: 8 }} onSubmit={addBlog}>
        <div>
          <label>
            Title
            <input
              style={{ margin: 8 }}
              type='text'
              value={title}
              placeholder='Blog title'
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Author
            <input
              style={{ marginLeft: 8, marginBottom: 8 }}
              type='text'
              value={author}
              placeholder='Blog author'
              onChange={(event) => setAuthor(event.target.value)}
            />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>
            Url
            <input
              style={{ marginLeft: 8 }}
              type='text'
              value={url}
              placeholder='Blog url'
              onChange={(event) => setUrl(event.target.value)}
            />
          </label>
        </div>
        <button type='submit'>Create</button>
      </form>
    </>
  )
}

export default NewBlog
