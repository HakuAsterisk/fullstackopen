import { useNotify } from '../hooks/useNotify'

const Notification = () => {
  const { notify } = useNotify()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (notify === null) {
    return null
  }
  return <div style={style}>{notify}</div>
}

export default Notification
