import { render, jsx } from '../lib/hooks.js'
import { Header } from './components/Header.js'
import { SignUpForm, TestComponent } from './components/SignUpForm.js'

export const App = () => {
  return (
    <div>
      <Header />
      <TestComponent />
    </div>
  )
}

render(<App></App>, document.getElementById('root'))
