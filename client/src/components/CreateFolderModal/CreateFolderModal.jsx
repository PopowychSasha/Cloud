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
import { useDispatch } from 'react-redux'
import { fileActions } from '../../redux/file'

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
  padding: 4,
}

function CreateFolderModal({ createFolderOpen, handleClose, folderStack }) {
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  const createFolder = () => {
    $api
      .post('/api/folder', {
        name,
        parentId: folderStack[folderStack.length - 1],
      })
      .then((data) => {
        if (data) {
          setName('')
          dispatch(fileActions.addFile(data.data))
          handleClose()
        }
      })
      .catch((err) => message({ info: err.message, status: 'error' }))
  }
  return (
    <Modal
      open={createFolderOpen}
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
          New folder
        </Typography>

        <TextField
          id="standard-basic"
          label="Folder name"
          variant="standard"
          sx={{ width: '100%' }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            variant="outlined"
            sx={{ width: '40%', mt: 2 }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ width: '40%', mt: 2 }}
            onClick={createFolder}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

CreateFolderModal.propTypes = {
  createFolderOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  folderStack: PropTypes.array,
}

export default CreateFolderModal
