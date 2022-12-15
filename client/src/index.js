import { render, jsx } from '../lib/hooks.js'
import { Context } from './auth-context.js'
import { Header } from './components/Header.js'
import { SignUpForm, TestComponent } from './components/SignUpForm.js'
import { contextValue } from './auth-context.js'

export const App = () => {
  return (
    <div>
      <Header />
      <TestComponent />
    </div>
  )
}

render(
  <Context data={contextValue}>
    <App />
  </Context>,
  document.getElementById('root')
)
