import PropTypes from 'prop-types'
import { Box, Table, TableBody, Typography } from '@mui/material'
import FileItem from '../FileItem/FileItem'

function ListOfFiles({ files }) {
  return (
    <Box sx={{ maxHeight: '70%', overflow: 'scroll' }}>
      {files.length > 0 ? (
        <Table aria-label="simple table">
          <TableBody>
            {files.map((file, idx) => (
              <FileItem key={file.id} file={file} idx={idx} />
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
    </Box>
  )
}

ListOfFiles.propTypes = {
  files: PropTypes.object,
}

export default ListOfFiles
