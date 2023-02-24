import { TableCell } from '@mui/material'
import Image from 'mui-image'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFiles } from '../../redux/thunk/fetchFiles'
import { message } from '../Message/Message'
import goBackImg from '../../image/go_back.png'
import { selectedFilesActions } from '../../redux/selectedFiles'
import { folderStackActions } from '../../redux/folderStack'

export function GoBack() {
  const dispatch = useDispatch()
  const folderStack = useSelector((store) => store.folderStackReducer)

  const goBack = () => {
    if (folderStack.length > 1) {
      dispatch(folderStackActions.goBack())
      dispatch(selectedFilesActions.clearFilesData())
      dispatch(
        fetchFiles({
          parendFolderId: folderStack[folderStack.length - 2],
        })
      )
    } else {
      message({ info: 'you are in the root folder', status: 'info' })
    }
  }
  return (
    <TableCell align="center">
      <Image
        src={goBackImg}
        alt="<"
        onClick={goBack}
        width={10}
        height={15}
        style={{ cursor: 'pointer' }}
      />
    </TableCell>
  )
}
