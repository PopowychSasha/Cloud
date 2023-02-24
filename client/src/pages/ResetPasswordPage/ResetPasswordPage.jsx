import { Box, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Message from '../../components/Message/Message'
import { useParams } from 'react-router-dom'
import $api from '../../http/request.js'
import ForgotPasswordForm from '../../components/ForgotPasswordForm/ForgotPasswordForm'

function ResetPasswordPage() {
  const params = useParams()

  const [correctLink, setCorrectLink] = useState(true)

  useEffect(() => {
    $api(`/api/reset_password/${params.token}`)
      .then((data) => {
        if (data) {
          setCorrectLink(true)
        }
      })
      .catch(() => {
        setCorrectLink(false)
      })
  }, [])

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
          backgroundColor: 'primary.main',
          borderRadius: '20px',
        }}
      >
        {correctLink ? (
          <ForgotPasswordForm />
        ) : (
          <Typography
            sx={{
              fontSize: '40px',
              height: '100%',
              color: 'primary.orange',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'primary.formBg',
              textAlign: 'center',
              borderRadius: '20px',
            }}
          >
            Reset password link is not valide
          </Typography>
        )}

        <Message />
      </Container>
    </Box>
  )
}

export default ResetPasswordPage
