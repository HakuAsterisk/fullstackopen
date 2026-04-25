import { createContext, useState, useEffect, useRef } from 'react'

const NotificationContext = createContext()
export default NotificationContext

export const NotificationContextProvider = (props) => {
  const [notify, setNotify] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (notify === null) return
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setNotify(null), 5000)
    return () => clearTimeout(timerRef.current)
  }, [notify])

  return (
    <NotificationContext.Provider value={{ notify, setNotify }}>
      {props.children}
    </NotificationContext.Provider>
  )
}
