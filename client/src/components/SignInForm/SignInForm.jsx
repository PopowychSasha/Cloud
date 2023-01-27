import { Box, Button, FormGroup } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PasswordIcon from '@mui/icons-material/Password'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormInput from '../FormInput/FormInput'
import ForgotPasswordModal from '../ForgotPasswordModal/ForgotPasswordModal'
import Message from '../Message/Message'
import { loginUser } from '../../redux/thunk/login'

function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [resetPasswordOpen, setResetPasswordOpen] = useState(false)
  const handleOpen = () => setResetPasswordOpen(true)
  const handleClose = () => setResetPasswordOpen(false)

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, setEmail, password, setPassword, navigate }))
  }

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <FormGroup>
          <FormInput
            title="Email"
            icon={<EmailIcon sx={{ color: 'primary.orange' }} />}
            type="text"
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: 10,
            }}
          >
            <Button
              variant="outlined"
              sx={{
                width: 250,
                height: 40,
                bg: 'red',
                color: 'white',
              }}
              onClick={handleOpen}
            >
              Forgot your password?
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="error"
              sx={{ width: 250, height: 40 }}
            >
              SIGN IN
            </Button>
          </Box>
        </FormGroup>
        <ForgotPasswordModal
          resetPasswordOpen={resetPasswordOpen}
          handleClose={handleClose}
        />
      </form>
      <Message />
    </>
  )
}

export default SignInForm
