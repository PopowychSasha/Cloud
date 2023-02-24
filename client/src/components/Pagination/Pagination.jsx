import { Box, Typography } from '@mui/material'
import Image from 'mui-image'
import goBackImg from '../../image/go_back.png'

export function Pagination() {
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
      <Typography>Rows per page : 10</Typography>
      <Typography sx={{ marginLeft: 3, marginRight: 3 }}>1-10 of 13</Typography>
      <Box sx={{ display: 'flex' }}>
        <Image
          src={goBackImg}
          alt="<"
          onClick={() => {}}
          width={10}
          height={15}
          style={{ cursor: 'pointer' }}
        />
        <Image
          src={goBackImg}
          alt="<"
          onClick={() => {}}
          width={10}
          height={15}
          style={{
            cursor: 'pointer',
            transform: 'rotate(180deg)',
            marginLeft: 10,
          }}
        />
      </Box>
    </Box>
  )
}
