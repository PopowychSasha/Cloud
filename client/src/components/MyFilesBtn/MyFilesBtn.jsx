import { Button, Typography } from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFiles } from '../../redux/thunk/fetchFiles'
import { folderStackActions } from '../../redux/folderStack'
import { filesTypeActions } from '../../redux/filesType'

function MyFilesBtn() {
  const dispatch = useDispatch()

  const fetchMyFiles = () => {
    dispatch(folderStackActions.removeFolderStack())
    dispatch(fetchFiles({ parendFolderId: null }))
    dispatch(filesTypeActions.setUsersFile())
  }

  const filesType = useSelector((store) => store.filesType.active)

  return (
    <Button
      sx={{
        width: 150,
        height: 40,
        border: `3px solid #E3DBD7`,
        display: 'flex',
        margin: 'auto',
        marginTop: 3,
        color: '#E3DBD7',
        backgroundColor: filesType === 'USER_FILES' && 'black',
      }}
      onClick={fetchMyFiles}
    >
      <FolderIcon sx={{ marginRight: '20px' }} />
      <Typography variant="contained">My files</Typography>
    </Button>
  )
}

export default MyFilesBtn
