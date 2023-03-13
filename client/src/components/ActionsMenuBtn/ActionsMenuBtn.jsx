import PropTypes from 'prop-types'
import { Button, Typography } from '@mui/material'
import Image from 'mui-image'
import { useDispatch, useSelector } from 'react-redux'
import $api from '../../http/request'
import { filesActions } from '../../redux/files'
import { message } from '../Message/Message'
import { useState } from 'react'
import Preloader from '../Preloader/Preloader'

function ActionsMenuBtn({
  title,
  icon,
  color,
  handleOpen,
  isFilePicker = false,
}) {
  const dispatch = useDispatch()
  const folderStack = useSelector((store) => store.folderStackReducer)
  const [showPreloader, setShowPreloader] = useState(false)

  const sendFile = (data) => {
    if (folderStack[folderStack.length - 1] !== null) {
      setShowPreloader(true)
      $api
        .post('/api/file', data)
        .then((data) => {
          if (data) {
            setShowPreloader(false)
            dispatch(filesActions.addFile(data.data))
          }
        })
        .catch((err) => {
          setShowPreloader(false)
          message({ info: err.message, status: 'error' })
        })
    } else {
      message({ info: 'you need to go to some folder', status: 'info' })
    }
  }

  const selectFile = (e) => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('folderId', folderStack[folderStack.length - 1])

    sendFile(data)
    e.target.value = ''
  }

  return (
    <Button
      sx={{
        width: 150,
        height: 40,
        border: `3px solid ${color}`,
        display: 'flex',
        margin: 'auto',
        color: color,
        marginTop: 3,
        disabled: true,
        fontSize: '11px',
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
      {showPreloader && <Preloader showPreloader={showPreloader} />}
    </Button>
  )
}

ActionsMenuBtn.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  handleOpen: PropTypes.func,
  isFilePicker: PropTypes.bool,
}

export default ActionsMenuBtn
