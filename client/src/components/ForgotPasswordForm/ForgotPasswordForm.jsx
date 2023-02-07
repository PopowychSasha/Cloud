import PropTypes from 'prop-types'
import { Box, Button, FormGroup, Typography } from '@mui/material'
import FormInput from '../FormInput/FormInput'
import PasswordIcon from '@mui/icons-material/Password'
import { useState } from 'react'
import $api from '../../http/request'
import { useNavigate, useParams } from 'react-router-dom'
import { message } from '../Message/Message'

function ForgotPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const params = useParams()

  const onSubmitHandler = (e) => {
    e.preventDefault()

    $api
      .post(`/api/new_password/${params.token}`, {
        password: password,
        confirmPassword: confirmPassword,
      })
      .then((data) => {
        if (data) {
          message({ info: data.data.message, status: 'success' })
          setTimeout(() => {
            navigate('/')
          }, 2000)
        }
      })
      .catch((err) => {
        message({ info: err.message, status: 'error' })
      })
  }

  return (
    <Box
      sx={{
        backgroundColor: 'primary.formBg',
        pt: 1,
        pb: 3,
        borderRadius: '20px',
      }}
    >
      <Typography
        sx={{
          fontSize: '25px',
          color: 'primary.orange',
          textAlign: 'center',
          mt: 2,
          mb: 4,
        }}
      >
        Forgot Password?
      </Typography>
      <Typography
        sx={{
          fontSize: '16px',
          color: '#FFF',
          width: '65%',
          margin: 'auto',
        }}
      >
        You can reset your password using this form
      </Typography>

      <form onSubmit={onSubmitHandler}>
        <FormGroup>
          <FormInput
            title="Password"
            icon={<PasswordIcon sx={{ color: 'primary.orange' }} />}
            type="password"
            value={password}
            setValue={setPassword}
          />
          <FormInput
            title="Confirm password"
            icon={<PasswordIcon sx={{ color: 'primary.orange' }} />}
            type="password"
            value={confirmPassword}
            setValue={setConfirmPassword}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: 10,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="error"
              sx={{ width: 350, height: 40 }}
            >
              Reset my password
            </Button>
          </Box>
        </FormGroup>
      </form>
    </Box>
  )
}

ForgotPasswordForm.propTypes = {
  onSubmitHandler: PropTypes.func,
}

export default ForgotPasswordForm
