import { component, useContext, useState } from '../../../lib/hooks.js'
import { Button } from '../Button/Button.js'
import { Header } from '../Header/Header.js'
import { LoginForm } from '../LoginForm/LoginForm.js'
import { Profile } from '../Profile/Profile.js'
import { RegistrationForm } from '../RegistrationForm/RegistrationForm.js'
import { jsx } from '../../../lib/hooks.js'
import './App.css'

export const App = component(() => {
  const context = useContext()

  const [formsToggle, setFormsToggle] = useState(false)

  const setLoginFormActiveHandler = () => {
    setFormsToggle(false)
  }
  const setRegistrationFormActiveHandler = () => {
    setFormsToggle(true)
  }

  if (context.id) {
    return <Profile />
  }
  return (
    <div>
      <div class={{ app: true }}>
        <Button title="Login" action={setLoginFormActiveHandler} />
        <Button
          title="Registration"
          action={setRegistrationFormActiveHandler}
        />
      </div>
      <Header formsToggle={formsToggle} />
      {formsToggle ? <RegistrationForm /> : <LoginForm />}
    </div>
  )
})
