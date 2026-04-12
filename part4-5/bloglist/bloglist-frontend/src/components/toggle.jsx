import { useState, useImperativeHandle } from 'react'

const Toggle = (props) => {
  const [visible, setVisible] = useState(false)

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hide}>
        <button onClick={toggleVisibility}>{props.closedLabel}</button>
      </div>
      <div style={show}>
        <button onClick={toggleVisibility}>{props.openLabel}</button>
        {props.children}
      </div>
    </div>
  )
}

export default Toggle
