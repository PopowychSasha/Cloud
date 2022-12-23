import { jsx } from '../../../lib/hooks.js'
import PropTypes from '../../../lib/prop-types.js'
import './Input.css'

export const Input = ({ title, onChange }) => {
  return (
    <div class={{ 'input-wrapper': true }}>
      <div>{title} </div>
      <input class={{ input: true }} on={{ input: onChange }} />
    </div>
  )
}

Input.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.function.isRequired,
}
