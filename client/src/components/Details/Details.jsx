import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import SharedLink from '../SharedLink/SharedLink'

function Details() {
  const filesType = useSelector((store) => store.filesType.active)

  return (
    <Box sx={{ width: 310 }}>
      <Typography
        sx={{
          textAlign: 'center',
          paddingBottom: 1,
          color: '#FFF',
          fontWeight: 700,
          paddingTop: 1,
        }}
      >
        Details
      </Typography>
      <Box sx={{ height: 3, backgroundColor: '#FA4616' }} />
      <Box sx={{ position: 'absolute', bottom: '50px' }}>
        {filesType === 'USER_FILES' && <SharedLink />}
      </Box>
    </Box>
  )
}

export default Details
