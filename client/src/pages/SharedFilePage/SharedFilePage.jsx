import { Box, Button, Container, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import FormInput from '../../components/FormInput/FormInput'
import Message, { message } from '../../components/Message/Message'
import EmailIcon from '@mui/icons-material/Email'
import PasswordIcon from '@mui/icons-material/Password'
import { useState } from 'react'
import $api from '../../http/request'

function SharedFilePage() {
  const params = useParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    $api
      .post(`/api/share/link`, {
        email: email,
        password: password,
        share_token: params.token,
      })
      .then(() => {
        message({ info: 'You have received the file', status: 'success' })
        setEmail('')
        setPassword('')
      })
      .catch((err) => message({ info: err.message, status: 'info' }))
  }

  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        border: 'solid',
        minWidth: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        sx={{
          width: '40%',
          height: '60%',
          backgroundColor: 'primary.formBg',
          borderRadius: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            sx={{ color: '#FFF', fontSize: '35px', textAlign: 'center' }}
          >
            to receive the file, enter your email and password
          </Typography>
          <form onSubmit={onSubmitHandler}>
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
            <Button
              type="submit"
              variant="contained"
              color="error"
              sx={{ width: 250, height: 40, mt: 4 }}
            >
              Confirm
            </Button>
          </form>
        </Box>

        <Message />
      </Container>
    </Box>
  )
}

export default SharedFilePage
