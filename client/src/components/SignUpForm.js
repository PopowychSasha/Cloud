import { useMemo } from '../../lib/hooks.js'
import { component, useState } from '../../lib/hooks.js'
import { jsx } from '../../lib/hooks.js'

const Counter = component(() => {
  const [counter, setCounter] = useState(() => 1)
  return (
    <div>
      <div>Counter={counter}</div>
      <button on={{ click: () => setCounter((counter) => counter + 10) }}>
        INC
      </button>
    </div>
  )
})

export const SignUpForm = component(() => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onChangeName = (e) => {
    setName(e.target.value)
  }
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit = () => {
    alert(
      JSON.stringify({
        name,
        email,
        password,
      })
    )
  }

  return (
    <div>
      <form id="form">
        <div>name </div>
        <input on={{ input: onChangeName }} /> <br />
        <div>email </div>
        <input on={{ input: onChangeEmail }} />
        <br />
        <div>password </div>
        <input on={{ input: onChangePassword }} /> <br />
        <br />
        <button on={{ click: onSubmit }}>SignUp</button>
      </form>
      <Counter />
    </div>
  )
})
