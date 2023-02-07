import PropTypes from 'prop-types'
import { Table, TableBody, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { fetchFiles } from '../../redux/thunk/fetchFiles'
import Image from 'mui-image'
import goBackImg from '../../image/go_back.png'
import { message } from '../Message/Message'
import FileItem from '../FileItem/FileItem'

function ListOfFiles({ files, folderStack }) {
  const dispatch = useDispatch()
  const goBack = () => {
    if (folderStack.length > 1) {
      folderStack.pop()
      dispatch(
        fetchFiles({
          parendFolderId: folderStack[folderStack.length - 1],
        })
      )
    } else {
      message({ info: 'you are in the root folder', status: 'info' })
    }
  }

  return (
    <>
      <Image
        src={goBackImg}
        alt="<"
        onClick={goBack}
        width={10}
        height={15}
        style={{ cursor: 'pointer', margin: '30px 0px 0px 30px' }}
      />
      {files.length > 0 ? (
        <Table
          sx={{ minWidth: 650, marginTop: '30px' }}
          aria-label="simple table"
        >
          <TableBody>
            {files.map((file, idx) => (
              <FileItem
                key={file.id}
                file={file}
                idx={idx}
                folderStack={folderStack}
              />
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography
          variant="h4"
          sx={{
            color: '#FFF',
            display: 'flex',
            justifyContent: 'center',
            mt: 10,
          }}
        >
          folder is empty
        </Typography>
      )}
    </>
  )
}

ListOfFiles.propTypes = {
  files: PropTypes.object,
  folderStack: PropTypes.array,
}

export default ListOfFiles
