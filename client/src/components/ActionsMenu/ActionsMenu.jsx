import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import ActionsMenuBtn from '../ActionsMenuBtn/ActionsMenuBtn'
import createFolder from '../../image/create_folder.png'
import addFile from '../../image/add_files.png'
import DeleteSelectedBtn from '../DeleteSelectedBtn/DeleteSelectedBtn'
import Space from '../Space/Space'
import SharedSelectedBtn from '../SharedSelectedBtn/SharedSelectedBtn'
import MyFilesBtn from '../MyFilesBtn/MyFilesBtn'
import SharedWithMeBtn from '../SharedWithMeBtn/SharedWithMeBtn'
import { useSelector } from 'react-redux'

function ActionsMenu({ handleOpen }) {
  const filesType = useSelector((store) => store.filesType.active)

  return (
    <Box sx={{ width: 248 }}>
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
      <SharedWithMeBtn />
      <MyFilesBtn />
      <DeleteSelectedBtn />
      {filesType === 'USER_FILES' && (
        <>
          <SharedSelectedBtn />
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
        </>
      )}

      <Space />
    </Box>
  )
}

ActionsMenu.propTypes = {
  handleOpen: PropTypes.func,
}

export default ActionsMenu
