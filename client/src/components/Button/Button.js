import { jsx } from '../../../lib/hooks.js'
import PropTypes from '../../../lib/prop-types.js'
import './Button.css'

export const Button = ({ title, action, type = 'default-btn' }) => {
  return (
    <button class={{ [type]: true }} on={{ click: action }}>
      {title}
    </button>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.function.isRequired,
  type: PropTypes.number,
}
