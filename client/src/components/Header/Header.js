import { component } from '../../../lib/hooks.js'
import { jsx } from '../../../lib/hooks.js'
import PropTypes from '../../../lib/prop-types.js'
import './Header.css'

export const Header = component(({ formsToggle }) => {
  return (
    <h1 class={{ header: true }}>
      {formsToggle ? 'Registration Form' : 'Login Form'}
    </h1>
  )
})

Header.propTypes = {
  formsToggle: PropTypes.boolean,
}
