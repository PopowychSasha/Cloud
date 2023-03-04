import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { selectedFilesActions } from '../../redux/selectedFiles'

function SharedLink() {
  const selectedFiles = useSelector((store) =>
    store.selectedFilesReducer.selectedFiles.filter((item) => {
      if (!item.isFolder && item) {
        return item
      }
    })
  )
  const dispatch = useDispatch()

  return (
    <Box>
      <Typography
        sx={{
          color: '#FFF',
          fontSize: '20px',
          marginBottom: '5px',
          textAlign: 'center',
        }}
      >
        Shared Link
      </Typography>
      <Box
        onFocus={(e) => e.target.classList.remove('disabled')}
        value={selectedFiles.length === 1 ? selectedFiles[0].token : ''}
        sx={{
          width: '215px',
          height: '45px',
          border: '2px solid #FA4616',
          margin: 'auto',
          color: '#FFF',
          fontSize: '15px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Typography>
          {selectedFiles.length === 1
            ? selectedFiles[0].token.split('-')[0]
            : '------------'}
        </Typography>
        <ContentCopyIcon
          onClick={() => {
            if (selectedFiles.length === 1) {
              navigator.clipboard.writeText(
                `http://localhost:3000/share/file/${selectedFiles[0].token}`
              )
              dispatch(selectedFilesActions.clearFilesData())
            }
          }}
          sx={{
            cursor: selectedFiles.length === 1 ? 'pointer' : 'not-allowed',
          }}
        />
      </Box>
    </Box>
  )
}

export default SharedLink
