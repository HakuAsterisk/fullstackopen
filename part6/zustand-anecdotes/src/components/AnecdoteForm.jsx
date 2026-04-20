import { useAnecdoteActions } from '../store'
const AnecdoteForm = () => {
  const addAnecdote = useAnecdoteActions().addAnecdote

  const getId = () => (100000 * Math.random()).toFixed(0)

  const add = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    const anecdote = { content: content, id: getId(), votes: 0 }
    addAnecdote(anecdote)
    e.target.reset()
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
