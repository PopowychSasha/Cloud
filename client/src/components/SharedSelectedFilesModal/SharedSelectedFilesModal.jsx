import PropTypes from 'prop-types'
import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Button, Checkbox, TextField } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
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

function SharedSelectedFilesModal({ modalOpen, setModalOpen }) {
  const [readonly, setReadonly] = useState(true)
  const [email, setEmail] = useState('')
  const { selectedFiles } = useSelector((store) => store.selectedFilesReducer)

  const shareFileHandler = () => {
    $api
      .post('/api/share/email', {
        email: email,
        files: selectedFiles,
        readonly: readonly,
      })
      .then(() => {
        message({
          info: 'You have sent the files to the user successfully',
          status: 'success',
        })
        setModalOpen(false)
      })
      .catch((err) => message({ info: err.message, status: 'info' }))
  }
  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: 1, fontWeight: 700, fontSize: 30 }}
          onClick={() => {
            setModalOpen(false)
          }}
        >
          Enter email to send files
        </Typography>
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          sx={{ width: '100%' }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            sx={{ width: '50%', display: 'block', margin: 'auto' }}
            onClick={shareFileHandler}
          >
            Send files
          </Button>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
            }}
          >
            <Typography>readonly</Typography>
            <Checkbox
              checked={readonly}
              onChange={() => setReadonly((s) => !s)}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

SharedSelectedFilesModal.propTypes = {
  modalOpen: PropTypes.bool,
  setModalOpen: PropTypes.func,
}

export default SharedSelectedFilesModal
