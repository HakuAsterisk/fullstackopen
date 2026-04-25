import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, create, update } from '../requests'
import { useNotify } from './useNotify'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const { setNotify } = useNotify()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: false,
  })

  const sortedAnecdotes = result.data
    ? [...result.data].sort((a, b) => b.votes - a.votes)
    : []

  const newAnecdoteMutation = useMutation({
    mutationFn: create,
    onSuccess: (newData) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newData))
      setNotify(`Anecdote '${newData.content}' created!`)
    },
    onError: (error) => {
      setNotify('Failed to create anecdote: ' + error.message)
    },
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((a) =>
          a.id === updateAnecdoteMutation.variables.id
            ? updateAnecdoteMutation.variables
            : a,
        ),
      )
      setNotify(`Voted for '${updateAnecdoteMutation.variables.content}'`)
    },
    onError: (error) => {
      setNotify('Failed to update anecdote: ' + error.message)
    },
  })

  return {
    anecdotes: sortedAnecdotes,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate(content),
    voteAnecdote: (anecdote) =>
      updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }),
  }
}
