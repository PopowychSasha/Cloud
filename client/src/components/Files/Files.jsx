import { Box, TableRow } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFiles } from '../../redux/thunk/fetchFiles'
import ListOfFiles from '../ListOfFiles/ListOfFiles'
import { Pagination } from '../Pagination/Pagination'
import { GoBack } from '../GoBack/GoBack'

function Files() {
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
        width: '90%',
      }}
    >
      {files.length === 0 && (
        <TableRow>
          <GoBack />
        </TableRow>
      )}

      <ListOfFiles files={files} />

      {files.length !== 0 && <Pagination />}
    </Box>
  )
}

export default Files
