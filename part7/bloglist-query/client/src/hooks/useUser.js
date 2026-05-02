import { useContext } from 'react'
import UserContext from '../components/contexts/user-context'

export const useUser = () => useContext(UserContext)

export default useUser
