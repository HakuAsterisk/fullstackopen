import { create } from 'zustand'

const initialAnecdotes = [
  { content: 'If it hurts, do it more often', id: '1', votes: 0 },
  {
    content: 'Adding manpower to a late software project makes it later!',
    id: '2',
    votes: 4,
  },
  {
    content:
      'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    id: '3',
    votes: 2,
  },
  {
    content:
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    id: '4',
    votes: 0,
  },
]

const sortByVotes = (anecdotes) =>
  [...anecdotes].sort((a, b) => b.votes - a.votes)

const useAnecdoteStore = create((set) => ({
  anecdotes: sortByVotes(initialAnecdotes),
  actions: {
    addAnecdote: (anecdote) =>
      set((state) => ({
        anecdotes: sortByVotes(state.anecdotes.concat(anecdote)),
      })),
    vote: (id) =>
      set((state) => ({
        anecdotes: sortByVotes(
          state.anecdotes.map((anecdote) =>
            anecdote.id === id
              ? { ...anecdote, votes: anecdote.votes + 1 }
              : anecdote,
          ),
        ),
      })),
    setFilter: (value) => set(() => ({ filter: value })),
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  if (!filter) return anecdotes
  return anecdotes.filter((a) =>
    a.content.toLowerCase().includes(filter.toLowerCase()),
  )
}
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions)
