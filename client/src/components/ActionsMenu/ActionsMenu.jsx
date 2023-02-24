import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import ActionsMenuBtn from '../ActionsMenuBtn/ActionsMenuBtn'
import createFolder from '../../image/create_folder.png'
import addFile from '../../image/add_files.png'
import DeleteSelectedBtn from '../DeleteSelectedBtn/DeleteSelectedBtn'
import Space from '../Space/Space'

function ActionsMenu({ handleOpen }) {
  return (
    <Box sx={{ width: 288 }}>
      <Typography
        sx={{
          textAlign: 'center',
          paddingBottom: 1,
          color: '#FFF',
          fontWeight: 700,
          paddingTop: 1,
        }}
      >
        ACTIONS MENU
      </Typography>
      <Box sx={{ height: 3, backgroundColor: '#FA4616' }} />
      <ActionsMenuBtn
        title={'Create Folder'}
        icon={createFolder}
        color="#FA4616"
        handleOpen={handleOpen}
        isFilePicker={false}
      />
      <ActionsMenuBtn
        title={'Add File'}
        icon={addFile}
        color="#FA4616"
        type="file"
        isFilePicker={true}
      />
      <DeleteSelectedBtn />
      <Space />
    </Box>
  )
}

ActionsMenu.propTypes = {
  handleOpen: PropTypes.func,
}

export default ActionsMenu
