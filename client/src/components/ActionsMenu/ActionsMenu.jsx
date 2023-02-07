import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import ActionsMenuBtn from '../ActionsMenuBtn/ActionsMenuBtn'
import createFolder from '../../image/create_folder.png'
import addFile from '../../image/add_files.png'

function ActionsMenu({ handleOpen, folderStack }) {
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
        folderStack={folderStack}
      />
    </Box>
  )
}

ActionsMenu.propTypes = {
  handleOpen: PropTypes.func,
  folderStack: PropTypes.array,
}

export default ActionsMenu
