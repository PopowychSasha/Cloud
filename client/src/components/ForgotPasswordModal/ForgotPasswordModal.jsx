import PropTypes from 'prop-types'
import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import SendIcon from '@mui/icons-material/Send'
import $api from '../../http/request'
import { message } from '../Message/Message'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 10,
  padding: 8,
}

function ForgotPasswordModal({ resetPasswordOpen, handleClose }) {
  const [email, setEmail] = useState('')

  const sendPasswordResetLink = () => {
    $api
      .post('/api/reset_password_link', { email })
      .then((data) => {
        if (data) {
          setEmail('')
          message({ info: 'message sent successfully', status: 'success' })
          setTimeout(() => {
            handleClose()
          }, 2000)
        }
      })
      .catch((err) => message({ info: err.message, status: 'error' }))
  }
  return (
    <Modal
      open={resetPasswordOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: 1, fontWeight: 700, fontSize: 30 }}
        >
          Forgot your password?
        </Typography>
        <Typography id="modal-modal-title" sx={{ marginBottom: 3 }}>
          we`ll email you a link to reset a password
        </Typography>
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          sx={{ width: '100%' }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ width: '100%', mt: 6 }}
          onClick={sendPasswordResetLink}
        >
          Send me a password reset link
        </Button>
        <Button
          variant="outlined"
          sx={{ width: '100%', mt: 2 }}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  )
}

ForgotPasswordModal.propTypes = {
  resetPasswordOpen: PropTypes.bool,
  handleClose: PropTypes.func,
}

export default ForgotPasswordModal
