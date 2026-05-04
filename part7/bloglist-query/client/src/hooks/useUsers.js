import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../services/users'

export const useUsers = () => {
  const users = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    refetchOnWindowFocus: false,
    retry: false,
  })

  const userById = (id) => {
    const usersData = users.data
    return usersData ? usersData.find((user) => user.id === id) : null
  }

  return {
    users: users.data,
    isPending: users.isPending,
    isError: users.isError,
    getUser: (id) => userById(id),
  }
}
