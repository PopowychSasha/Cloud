import { jsx } from '../../../lib/hooks.js'
import './Button.css'

export const Button = ({ title, action, type = 'default-btn' }) => {
  return (
    <button class={{ [type]: true }} on={{ click: action }}>
      {title}
    </button>
  )
}
