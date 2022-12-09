import { render, jsx } from '../lib/hooks.js'
import { Header } from './components/Header.js'
import { SignUpForm } from './components/SignUpForm.js'

export const App = () => {
  return (
    <div>
      <Header />
      <SignUpForm />
    </div>
  )
}

render(<App></App>, document.getElementById('root'))
