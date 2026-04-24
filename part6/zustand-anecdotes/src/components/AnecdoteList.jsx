import { useAnecdotes, useAnecdoteActions } from '../stores/anecdote-store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote, remove } = useAnecdoteActions()

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>{' '}
            {anecdote.votes === 0 && (
              <button onClick={() => remove(anecdote.id)}>delete</button>
            )}
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
