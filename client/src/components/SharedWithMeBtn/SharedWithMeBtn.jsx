import { Button, Typography } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import $api from '../../http/request'
import { useDispatch, useSelector } from 'react-redux'
import { filesActions } from '../../redux/files'
import { filesTypeActions } from '../../redux/filesType'

function SharedWithMeBtn() {
  const dispatch = useDispatch()
  const filesType = useSelector((store) => store.filesType.active)
  const sorting = useSelector((store) => store.sortingReducer)
  const { rowsPerPage } = useSelector((store) => store.filesReducer)

  const fetchSharedFiles = () => {
    $api(
      `/api/files/share?column=${sorting.element}&order=${sorting.order}&rowsPerPage=${rowsPerPage}`
    )
      .then((data) => {
        if (data) {
          dispatch(filesActions.setFilesData(data.data))
          dispatch(filesTypeActions.setSharedFile())
        }
      })
      .catch((err) => console.log(err))
  }
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
        fontSize: '10px',
        backgroundColor: filesType === 'SHARED_FILES' && 'black',
      }}
      onClick={fetchSharedFiles}
    >
      <PeopleIcon sx={{ marginRight: '20px' }} />
      <Typography variant="contained">SHARE WITH ME</Typography>
    </Button>
  )
}

export default SharedWithMeBtn
