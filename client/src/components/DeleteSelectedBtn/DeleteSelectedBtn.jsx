import { Button, Typography } from '@mui/material'
import Image from 'mui-image'
import { useDispatch, useSelector } from 'react-redux'
import $api from '../../http/request'
import delete_icon from '../../image/delete.png'
import { fileActions } from '../../redux/file'
import { selectedFilesActions } from '../../redux/selectedFiles'
import { message } from '../Message/Message'

function DeleteSelectedBtn() {
  const dispatch = useDispatch()
  const selectedFiles = useSelector(
    (store) => store.selectedFilesReducer.selectedFiles
  )
  const folderStack = useSelector((store) => store.folderStackReducer)
  const filesType = useSelector((store) => store.filesType.active)

  const deleteSelectedFile = () => {
    if (selectedFiles.length && filesType === 'USER_FILES') {
      $api
        .delete('/api/files', {
          data: {
            files: selectedFiles,
            parendFolderId: folderStack[folderStack.length - 1],
          },
        })
        .then((data) => {
          dispatch(fileActions.setFilesData(data.data))
          dispatch(selectedFilesActions.clearFilesData())
        })
        .catch((err) => console.log(err))
    } else if (selectedFiles.length && filesType === 'SHARED_FILES') {
      $api
        .delete('/api/files/shared', {
          data: {
            files: selectedFiles,
          },
        })
        .then((data) => {
          dispatch(fileActions.setFilesData(data.data))
          dispatch(selectedFilesActions.clearFilesData())
        })
        .catch((err) => console.log(err))
    } else {
      message({ info: 'You need to select a file', status: 'info' })
    }
  }
  return (
    <Button
      sx={{
        width: 150,
        height: 40,
        border: `3px solid black`,
        display: 'flex',
        margin: 'auto',
        color: 'black',
        marginTop: 3,
        fontSize: '10px',
      }}
      onClick={deleteSelectedFile}
    >
      <Image
        src={delete_icon}
        width={17}
        height={13}
        alt="create"
        style={{ marginRight: '40px' }}
      />
      <Typography variant="contained">Delete selected</Typography>
    </Button>
  )
}

export default DeleteSelectedBtn
