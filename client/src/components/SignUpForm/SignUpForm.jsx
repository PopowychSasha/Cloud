import { Button, FormGroup } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import EmailIcon from '@mui/icons-material/Email'
import PasswordIcon from '@mui/icons-material/Password'
import { useState } from 'react'
import FormInput from '../FormInput/FormInput'
import $api from '../../http/request'
import Message, { message } from '../Message/Message'

function SignUpForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState()

  const onSubmitHandler = (e) => {
    e.preventDefault()

    $api
      .post('/api/register', { name, email, password, confirmPassword })
      .then((data) => {
        if (data) {
          setName('')
          setEmail('')
          setPassword('')
          setConfirmPassword('')
          message({
            info: 'Go to the email to activate the account',
            status: 'success',
          })
        }
      })
      .catch((err) => message({ info: err.message, status: 'error' }))
  }

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <FormGroup>
          <FormInput
            title="Name"
            icon={<PeopleIcon sx={{ color: 'primary.orange' }} />}
            value={name}
            setValue={setName}
          />
          <FormInput
            title="Email"
            icon={<EmailIcon sx={{ color: 'primary.orange' }} />}
            value={email}
            setValue={setEmail}
          />
          <FormInput
            title="Passowrd"
            icon={<PasswordIcon sx={{ color: 'primary.orange' }} />}
            type="password"
            value={password}
            setValue={setPassword}
          />
          <FormInput
            title="Confirm Passowrd"
            icon={<PasswordIcon sx={{ color: 'primary.orange' }} />}
            type="password"
            value={confirmPassword}
            setValue={setConfirmPassword}
          />

          <Button
            type="submit"
            variant="contained"
            color="error"
            sx={{
              width: 250,
              height: 40,
              margin: 'auto',
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            SIGN UP
          </Button>
        </FormGroup>
      </form>
      <Message />
    </>
  )
}

export default SignUpForm
