import { change, component, useContext, useState } from '../../../lib/hooks.js'
import { jsx } from '../../../lib/hooks.js'
import { callAPI } from '../../api/callAPI.js'
import { Button } from '../Button/Button.js'
import { Input } from '../Input/Input.js'
import './LoginForm.css'

export const LoginForm = component(() => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const context = useContext()

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    callAPI({
      url: '/api/login',
      method: 'POST',
      context,
      body: { email, password },
    }).then(({ id, name, email, key }) => {
      change(() => {
        context.login(id, name, email, key)
      })
    })
  }

  return (
    <form class={{ 'login-form': true }}>
      <Input title="email" onChange={onChangeEmail} />
      <Input title="password" onChange={onChangePassword} />
      <Button title="Login" action={onSubmit} type="form-btn" />
    </form>
  )
})
