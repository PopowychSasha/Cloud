import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import $api from '../../http/request'
import { message } from '../Message/Message'
import prettyBytes from 'pretty-bytes'
import { Progress } from 'react-sweet-progress'
import 'react-sweet-progress/lib/style.css'

function Space() {
  const files = useSelector((store) => store.filesReducer)
  const [spaceInfo, setSpaceInfo] = useState({ space: 0, availableSpace: 0 })
  useEffect(() => {
    $api('/api/space')
      .then((data) => {
        setSpaceInfo(data.data)
      })
      .catch((err) => message({ info: err.messge, status: 'error' }))
  }, [files])
  return (
    <Box
      sx={{
        width: 180,
        position: 'absolute',
        bottom: '0px',
        marginTop: '45%',
      }}
    >
      <Box sx={{ height: '3px', backgroundColor: 'primary.orange' }} />
      <Box sx={{ fontSize: '25px', color: '#FFF', textAlign: 'center' }}>
        YOUR SPACE
      </Box>
      <Box sx={{ height: '3px', backgroundColor: 'primary.orange' }} />
      <Progress
        percent={(spaceInfo.space / spaceInfo.availableSpace) * 100}
        status="success"
        style={{ marginTop: '25px' }}
      />
      <Box sx={{ fontSize: '16px', color: '#FFF', textAlign: 'center' }}>
        {prettyBytes(spaceInfo.space)} OUT OF{' '}
        {prettyBytes(spaceInfo.availableSpace)}{' '}
      </Box>
    </Box>
  )
}

export default Space
