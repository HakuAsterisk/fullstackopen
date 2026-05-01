import { useContext } from 'react'
import NotificationContext from '../components/contexts/notification-context'

export const useNotification = () => useContext(NotificationContext)

export default useNotification
