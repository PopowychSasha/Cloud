import PropTypes from 'prop-types'
import { Button, Typography } from '@mui/material'
import Image from 'mui-image'
import { useDispatch } from 'react-redux'
import $api from '../../http/request'
import { fileActions } from '../../redux/file'
import { message } from '../Message/Message'

function ActionsMenuBtn({
  title,
  icon,
  color,
  handleOpen,
  isFilePicker = false,
  folderStack,
}) {
  const dispatch = useDispatch()

  const sendFile = (data) => {
    if (folderStack[folderStack.length - 1] !== null) {
      $api
        .post('/api/file', data)
        .then((data) => {
          if (data) {
            dispatch(fileActions.addFile(data.data))
          }
        })
        .catch((err) => message({ info: err.message, status: 'error' }))
    } else {
      message({ info: 'you need to go to some folder', status: 'info' })
    }
  }

  const selectFile = (e) => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('folderId', folderStack[folderStack.length - 1])

    sendFile(data)
  }

  return (
    <Button
      sx={{
        width: 225,
        height: 40,
        border: `3px solid ${color}`,
        display: 'flex',
        margin: 'auto',
        color: color,
        marginTop: 3,
      }}
      onClick={handleOpen}
    >
      <Image
        src={icon}
        width={17}
        height={13}
        alt="create"
        style={{ marginRight: '40px' }}
      />
      <Typography variant="contained">
        {isFilePicker ? (
          <Button component="label">
            <Typography sx={{ color: color }}>{title}</Typography>
            <input type="file" hidden onChange={selectFile} />
          </Button>
        ) : (
          title
        )}
      </Typography>
    </Button>
  )
}

ActionsMenuBtn.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  handleOpen: PropTypes.func,
  isFilePicker: PropTypes.bool,
  folderStack: PropTypes.array,
}

export default ActionsMenuBtn
