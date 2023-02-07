import { Box, Typography } from '@mui/material'

function Details() {
  return (
    <Box sx={{ width: 376 }}>
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
    </Box>
  )
}

export default Details
