import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, {
  useAnecdotes,
  useAnecdoteActions,
} from './stores/anecdote-store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('Anecdote Actions', () => {
  it('initialize finds set data from store', async () => {
    const mockData = [{ id: 1, content: 'Test', votes: 0 }]
    anecdoteService.getAll.mockResolvedValue(mockData)

    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockData)
  })

  it('Recieved anecdotes are sorted by votes', async () => {
    const mockData = [
      { id: 1, content: 'Test', votes: 2 },
      { id: 2, content: 'Another test', votes: 5 },
    ]
    anecdoteService.getAll.mockResolvedValue(mockData)

    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current[0].votes).toBeGreaterThanOrEqual(
      anecdotesResult.current[1].votes,
    )
  })

  it('Recieved properly filtered list of anecdotes', async () => {
    const mockData = [
      { id: 1, content: 'Test', votes: 2 },
      { id: 2, content: 'Another test', votes: 5 },
    ]
    anecdoteService.getAll.mockResolvedValue(mockData)

    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.initialize()
      result.current.setFilter('Another')
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual([
      { id: 2, content: 'Another test', votes: 5 },
    ])
  })

  it('Voting increases number of votes for anecdote', async () => {
    const mockData = [{ id: 1, content: 'Test', votes: 2 }]
    anecdoteService.getAll.mockResolvedValue(mockData)
    anecdoteService.update.mockResolvedValue({
      id: 1,
      content: 'Test',
      votes: 3,
    })

    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.initialize()
      await result.current.vote(1)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current[0].votes).toBe(3)
  })
})
