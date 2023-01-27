import { Box } from '@mui/material'
import { useState } from 'react'
import FormTitle from '../FormTitle/FormTitle'
import SignInForm from '../SignInForm/SignInForm'
import SignUpForm from '../SignUpForm/SignUpForm'

function AuthForm() {
  const [formToggle, setFormToggle] = useState(true)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: 650, minHeight: 414, bgcolor: 'primary.form_bg' }}>
        <FormTitle formToggle={formToggle} setFormToggle={setFormToggle} />
        {formToggle ? <SignInForm /> : <SignUpForm />}
      </Box>
    </Box>
  )
}

export default AuthForm
