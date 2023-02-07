import PropTypes from 'prop-types'
import { TableCell, TableRow } from '@mui/material'
import { useDispatch } from 'react-redux'
import { fetchFiles } from '../../redux/thunk/fetchFiles'
import fileIcon from '../../image/file.png'
import folderIcon from '../../image/folder.png'
import Image from 'mui-image'
import DownloadIcon from '@mui/icons-material/Download'
import $api from '../../http/request'
import fileDownload from 'js-file-download'

function FileItem({ file, idx, folderStack }) {
  const dispatch = useDispatch()

  const downloadFile = async (id) => {
    $api(`/api/file/${id}`, {
      responseType: 'blob',
    }).then((response) => {
      fileDownload(response.data, file.name)
    })
  }
  return (
    <TableRow
      key={file.id}
      sx={{
        backgroundColor: idx % 2 ? '#293133' : '#0E1112',
        cursor: file.isFolder && 'pointer',
        '&:hover': {
          background: '#344174',
        },
        transition: '0.3s',
      }}
      onClick={() => {
        if (file.isFolder) {
          folderStack.push(file.id)
          dispatch(fetchFiles({ parendFolderId: file.id }))
        }
      }}
    >
      <TableCell align="left">
        <Image
          src={file.isFolder ? folderIcon : fileIcon}
          height={40}
          width={40}
        />
      </TableCell>
      <TableCell sx={{ color: '#FFF' }}>{file.name}</TableCell>
      <TableCell sx={{ color: '#FFF' }}>
        {Math.ceil(Math.random() * 100)}GB
      </TableCell>
      <TableCell sx={{ color: '#FFF' }}>{new Date().toISOString()}</TableCell>
      <TableCell sx={{ color: '#FFF' }}>
        {!file.isFolder && (
          <DownloadIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => downloadFile(file.id)}
          />
        )}
      </TableCell>
    </TableRow>
  )
}

FileItem.propTypes = {
  file: PropTypes.object,
  idx: PropTypes.number,
  folderStack: PropTypes.array,
}

export default FileItem
