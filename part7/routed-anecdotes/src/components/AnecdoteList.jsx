import { useAnecdotes } from '../hooks/index'

const AnecdoteList = () => {
  const { anecdotes, removeAnecdote } = useAnecdotes()

  if (!anecdotes) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            {anecdote.content}{' '}
            <button onClick={() => removeAnecdote(anecdote.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AnecdoteList
