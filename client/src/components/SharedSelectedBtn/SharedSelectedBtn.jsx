import { Button, Typography } from '@mui/material'
import Image from 'mui-image'
import { useState } from 'react'
import share_icon from '../../image/share.png'
import SharedSelectedFilesModal from '../SharedSelectedFilesModal/SharedSelectedFilesModal'

function SharedSelectedBtn() {
  const [modalOpen, setModalOpen] = useState('')

  return (
    <Button
      sx={{
        width: 150,
        height: 40,
        border: `3px solid black`,
        display: 'flex',
        margin: 'auto',
        color: 'black',
        marginTop: 3,
        fontSize: '11px',
      }}
    >
      <Image
        src={share_icon}
        width={17}
        height={13}
        alt="create"
        style={{ marginRight: '40px' }}
      />
      <Typography onClick={() => setModalOpen(true)} variant="contained">
        SHARE SELECTED
      </Typography>
      <SharedSelectedFilesModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </Button>
  )
}

export default SharedSelectedBtn
