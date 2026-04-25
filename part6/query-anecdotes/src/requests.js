const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}

export const create = async (data) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to create anecdote')
  }
  return await response.json()
}

export const update = async (data) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  const response = await fetch(`${baseUrl}/${data.id}`, options)

  if (!response.ok) {
    throw new Error('Failed to update anecdote')
  }
  return await response.json()
}
