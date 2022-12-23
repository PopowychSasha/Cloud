import { jsx } from '../../../lib/hooks.js'
import './Input.css'

export const Input = ({ title, onChange }) => {
  return (
    <div class={{ 'input-wrapper': true }}>
      <div>{title} </div>
      <input class={{ input: true }} on={{ input: onChange }} />
    </div>
  )
}
