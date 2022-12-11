import { useEffect, useMemo } from '../../lib/hooks.js'
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

export const TestComponent = component(() => {
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(false)
  return (
    <div>
      <h1>THis is test component</h1>
      <button on={{ click: () => setToggle1(!toggle1) }}>Toggle1</button>
      {toggle1 && (
        <div>
          <SignUpForm />
          <TestClent1 />
        </div>
      )}
      <br />
      <button on={{ click: () => setToggle2(!toggle2) }}>Toggle2</button>
      {toggle2 && (
        <div>
          <TestClent1 />
        </div>
      )}
    </div>
  )
})

const TestClent1 = () => {
  useEffect(() => {
    console.log('This is TestClean1')
    return () => console.log('Clean TestCling1')
  }, [])
  return <h1>This is TestClent1 component</h1>
}

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

  const onSubmit = (e) => {
    e.preventDefault()
    alert(
      JSON.stringify({
        name,
        email,
        password,
      })
    )
  }

  useEffect(() => {
    console.log('This is SignUpForm')
  }, [name])

  return (
    <div>
      <form id="form">
        <div>name </div>
        <input on={{ input: onChangeName }} value={name} /> <br />
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
