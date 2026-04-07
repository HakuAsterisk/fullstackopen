const NewBlog = (
  handleNewBlog,
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
) => {
  return (
    <form onSubmit={handleNewBlog}>
      <div>
        <label>
          Title
          <input
            style={{ margin: 8 }}
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
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
            onChange={({ target }) => setAuthor(target.value)}
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
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type='submit'>Create</button>
    </form>
  )
}

export default NewBlog
