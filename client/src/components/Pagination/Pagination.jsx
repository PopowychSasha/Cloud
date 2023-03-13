import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import CountOfFilesOnPage from '../CountOfFilesOnPage/CountOfFilesOnPage'
import FilesCounter from '../FilesCounter/FilesCounter'
import SwitchFilesPageBtn from '../SwitchFilesPageBtn/SwitchFilesPageBtn'

export function Pagination() {
  const { rowsPerPage } = useSelector((store) => store.filesReducer)
  const filesType = useSelector((store) => store.filesType.active)

  const [start, setStart] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    setPageNumber(1)
    setStart(0)
  }, [filesType])

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        color: '#FFF',
        display: 'flex',
        alignContent: 'center',
      }}
    >
      <CountOfFilesOnPage setPageNumber={setPageNumber} setStart={setStart} />
      <FilesCounter pageNumber={pageNumber} rowsPerPage={rowsPerPage} />
      <Box sx={{ display: 'flex' }}>
        <SwitchFilesPageBtn
          start={start}
          setStart={setStart}
          setPageNumber={setPageNumber}
          direction="back"
        />
        <SwitchFilesPageBtn
          start={start}
          setStart={setStart}
          setPageNumber={setPageNumber}
          direction="forward"
          rotateDegrees={180}
        />
      </Box>
    </Box>
  )
}
