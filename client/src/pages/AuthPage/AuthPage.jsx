import { Box, Container } from '@mui/material'
import AuthForm from '../../components/AuthForm/AuthForm'
import Header from '../../share/Header/Header'

function AuthPage() {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        border: 'solid',
        minWidth: '100%',
        height: '100vh',
      }}
    >
      <Header />
      <Container sx={{ marginTop: 12 }}>
        <AuthForm />
      </Container>
    </Box>
  )
}

export default AuthPage
