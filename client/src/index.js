import { render, jsx } from '../lib/hooks.js'
import { Context, contextValue } from './auth-context.js'
import { App } from './components/App/App.js'

render(
  () => (
    <Context data={contextValue}>
      <App />
    </Context>
  ),
  document.getElementById('root')
)
