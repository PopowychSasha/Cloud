import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'

function FilesCounter({ pageNumber, rowsPerPage }) {
  const { countOfFilesInFolder } = useSelector((store) => store.filesReducer)
  return (
    <Typography sx={{ marginLeft: 3, marginRight: 3 }}>
      {pageNumber === 1 ? 1 : (pageNumber - 1) * rowsPerPage}-
      {pageNumber * rowsPerPage > countOfFilesInFolder
        ? countOfFilesInFolder
        : pageNumber * rowsPerPage}{' '}
      of {countOfFilesInFolder}
    </Typography>
  )
}

export default FilesCounter
