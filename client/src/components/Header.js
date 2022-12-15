import { component, useContext } from '../../lib/hooks.js'
import { jsx } from '../../lib/hooks.js'
import { change } from '../../lib/hooks.js'

export const Header = component((props, children) => {
  const context = useContext()

  return (
    <h1>
      Sign up Form
      <div>ClientId={context.id}</div>
      <div>IsLogIn={context.isLoggedIn ? 'YES' : 'NO'}</div>
      <button
        on={{
          click: () =>
            change(() => {
              context.register()
            }),
        }}
      >
        REGISTER
      </button>
      <button
        on={{
          click: () =>
            change(() => {
              context.loggedInToggle()
            }),
        }}
      >
        LogStatus
      </button>
    </h1>
  )
})
