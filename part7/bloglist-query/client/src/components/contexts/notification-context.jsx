import { createContext, useEffect, useRef, useReducer } from 'react'

const NotificationContext = createContext()
export default NotificationContext

function reducer(state, action) {
  switch (action.type) {
    case 'set_notif':
      return {
        message: action.message,
        isSuccess: action.isSuccess,
      }
    case 'clear_notif':
      return {
        message: null,
        isSuccess: true,
      }
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

export const NotificationContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    message: null,
    isSuccess: true,
  })
  const timerRef = useRef(null)

  useEffect(() => {
    if (state.message === null) return
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => dispatch({ type: 'clear_notif' }), 5000)
    return () => clearTimeout(timerRef.current)
  }, [state])

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}
