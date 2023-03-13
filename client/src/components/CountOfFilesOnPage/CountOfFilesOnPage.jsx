import { useDispatch, useSelector } from 'react-redux'
import { filesActions } from '../../redux/files'
import { Typography } from '@mui/material'
import { fetchFiles } from '../../redux/thunk/fetchFiles'
import { fetchShareFiles } from '../../redux/thunk/fetchShareFiles'

function CountOfFilesOnPage({ setPageNumber, setStart }) {
  const dispatch = useDispatch()
  const sorting = useSelector((store) => store.sortingReducer)
  const folderStack = useSelector((store) => store.folderStackReducer)
  const { rowsPerPage } = useSelector((store) => store.filesReducer)
  const filesType = useSelector((store) => store.filesType.active)

  const onChangeCountOfFiles = (e) => {
    dispatch(filesActions.setRowsPerPage(+e.target.value))

    if (filesType === 'USER_FILES') {
      dispatch(
        fetchFiles({
          parendFolderId: folderStack[folderStack.length - 1],
          element: sorting.element,
          order: sorting.order,
          rowsPerPage: +e.target.value,
        })
      )
    } else if (filesType === 'SHARED_FILES') {
      dispatch(
        fetchShareFiles({
          element: sorting.element,
          order: sorting.order,
          rowsPerPage: +e.target.value,
          start: 0,
        })
      )
    }
    setPageNumber(1)
    setStart(0)
  }
  return (
    <Typography>
      Rows per page :{' '}
      <select
        onChange={onChangeCountOfFiles}
        defaultValue={rowsPerPage}
        style={{
          width: '50px',
          border: '1px solid black',
          borderRadius: '10px',
        }}
      >
        {[5, 10, 15, 20, 25, 30].map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
    </Typography>
  )
}

export default CountOfFilesOnPage
