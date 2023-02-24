import { Modal } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

function Preloader({ showPreloader }) {
  return (
    <div>
      <Modal
        open={showPreloader}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={style}
      >
        <CircularProgress />
      </Modal>
    </div>
  )
}

export default Preloader
