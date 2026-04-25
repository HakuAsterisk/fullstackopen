import { useAnecdotes } from './hooks/useAnecdotes'

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes()

  const onCreate = (event) => {
    event.preventDefault()
    const content = {
      content: event.target.anecdote.value,
      votes: 0,
    }
    if (content.content.length < 5) {
      alert('Anecdote must be at least 5 characters long')
      event.target.reset()
      return
    } else {
      event.target.reset()
      addAnecdote(content)
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input style={{ marginRight: 8, marginBottom: 8 }} name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
