import { useAnecdoteActions } from '../stores/anecdote-store'

const AnecdoteFilter = () => {
  const { setFilter } = useAnecdoteActions()
  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <input
      name='filter'
      type='text'
      placeholder='Filter notes'
      onChange={handleChange}
    />
  )
}

export default AnecdoteFilter
