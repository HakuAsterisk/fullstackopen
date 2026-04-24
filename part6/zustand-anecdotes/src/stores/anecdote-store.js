import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import anecdoteService from '../services/anecdotes'
import { useNotificationStore } from './notification-store'

const setNotification = (message) => {
  useNotificationStore.getState().actions.setNotification(message)
}

const sortByVotes = (anecdotes) =>
  [...anecdotes].sort((a, b) => b.votes - a.votes)

const useAnecdoteStore = create(
  devtools((set, get) => ({
    anecdotes: [],
    actions: {
      addAnecdote: async (anecdote) => {
        const newAnecdote = await anecdoteService.createNew(anecdote)
        set((state) => ({
          anecdotes: sortByVotes(state.anecdotes.concat(newAnecdote)),
        }))
        setNotification(`You added '${newAnecdote.content}'`)
      },

      vote: async (id) => {
        const anecdote = get().anecdotes.find((a) => a.id === id)
        const update = await anecdoteService.update(id, {
          ...anecdote,
          votes: anecdote.votes + 1,
        })
        set((state) => ({
          anecdotes: sortByVotes(
            state.anecdotes.map((a) => (a.id === id ? update : a)),
          ),
        }))
        setNotification(`You voted '${update.content}'`)
      },

      remove: async (id) => {
        await anecdoteService.remove(id)
        set((state) => ({
          anecdotes: state.anecdotes.filter((a) => a.id !== id),
        }))
        setNotification('Anecdote deleted')
      },

      setFilter: (value) => set(() => ({ filter: value })),

      initialize: async () => {
        const anecdotes = await anecdoteService.getAll()
        set(() => ({ anecdotes: sortByVotes(anecdotes) }))
      },
    },
  })),
)

export default useAnecdoteStore

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
