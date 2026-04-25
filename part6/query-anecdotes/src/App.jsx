import AnecdoteForm from './components/AnecdoteForm'
//import Notification from './components/Notification'
import { useAnecdotes } from './components/hooks/useAnecdotes'

const App = () => {
  const { anecdotes, isPending, isError, voteAnecdote } = useAnecdotes()

  const handleVote = (anecdote) => {
    voteAnecdote(anecdote)
  }

  if (isPending) {
    return <div>loading data...</div>
  }
  if (isError) {
    return <h1>Service currently unavailable due to server error...</h1>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{' '}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
