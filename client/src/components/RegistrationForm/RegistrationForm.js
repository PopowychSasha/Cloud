import { change, component, useContext, useState } from '../../../lib/hooks.js'
import { jsx } from '../../../lib/hooks.js'
import { callAPI } from '../../api/callAPI.js'
import { Button } from '../Button/Button.js'
import { Input } from '../Input/Input.js'
import './RegistrationForm.css'

export const RegistrationForm = component(() => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const context = useContext()

  const onChangeName = (e) => {
    setName(e.target.value)
  }
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    callAPI({
      url: '/api/registration',
      method: 'POST',
      context,
      body: { name, email, password },
    }).then(({ id, name, email, key }) => {
      change(() => {
        context.login(id, name, email, key)
      })
    })
  }

  return (
    <form class={{ 'registration-form': true }}>
      <Input title="name" onChange={onChangeName} />
      <Input title="email" onChange={onChangeEmail} />
      <Input title="password" onChange={onChangePassword} />
      <Button title="Registration" action={onSubmit} type="form-btn" />
    </form>
  )
})
