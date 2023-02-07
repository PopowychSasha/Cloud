import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFiles } from '../../redux/thunk/fetchFiles'
import ListOfFiles from '../ListOfFiles/ListOfFiles'

function Files({ folderStack }) {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.userReducer)
  const files = useSelector((store) => store.fileReducer)

  useEffect(() => {
    if (user.id) {
      dispatch(fetchFiles({ parendFolderId: null }))
    }
  }, [user])

  return (
    <Box
      sx={{
        width: '60%',
      }}
    >
      <ListOfFiles files={files} folderStack={folderStack} />
    </Box>
  )
}

Files.propTypes = {
  folderStack: PropTypes.array,
}

export default Files
