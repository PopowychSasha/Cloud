import { Box, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Message, { message } from '../../components/Message/Message'
import $api from '../../http/request'

function AccountActivationPage() {
  const params = useParams()

  const [messageToUser, setMessageToUser] = useState(false)

  useEffect(() => {
    $api(`/api/activation/${params.token}`)
      .then((data) => {
        if (data) {
          setMessageToUser(data.data.message)
        }
      })
      .catch((err) => {
        message(err.message)
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
          backgroundColor: 'primary.formBg',
          borderRadius: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{ color: '#FFF', fontSize: '35px', textAlign: 'center' }}
        >
          {messageToUser}
        </Typography>
        <Message />
      </Container>
    </Box>
  )
}

export default AccountActivationPage
