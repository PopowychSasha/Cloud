import { Checkbox, TableCell, TableRow } from '@mui/material'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { selectedFilesActions } from '../../redux/selectedFiles'
import { GoBack } from '../GoBack/GoBack'
import $api from '../../http/request'
import { filesActions } from '../../redux/files'
import { sortingActions } from '../../redux/sorting'
import FilesHeaderItem from '../FilesHeaderItem/FilesHeaderItem'
import { searchFilesActions } from '../../redux/searchFiles'

export function FilesHeader() {
  const dispatch = useDispatch()
  const sorting = useSelector((store) => store.sortingReducer)
  const { files } = useSelector((store) => store.filesReducer)
  const [mainCheckerActive, setMainCheckerActive] = useState(false)
  const { rowsPerPage } = useSelector((store) => store.filesReducer)

  const folderStack = useSelector((store) => store.folderStackReducer)
  const filesType = useSelector((store) => store.filesType.active)
  const searchString = useSelector((store) => store.searchFilesReducer)

  const sortFiles = () => {
    const requestUrl =
      filesType === 'SHARED_FILES'
        ? `/api/files/share?column=${sorting.element}&order=${sorting.order}&rowsPerPage=${rowsPerPage}`
        : `/api/folder/${folderStack[folderStack.length - 1]}?column=${
            sorting.element
          }&order=${
            sorting.order === 'asc' ? 'desc' : 'asc'
          }&rowsPerPage=${rowsPerPage}`

    if (searchString.length === 0) {
      $api
        .get(requestUrl)
        .then((data) => {
          dispatch(filesActions.setFilesData(data.data))
        })
        .catch((err) => console.log(err))
    } else {
      $api
        .get(
          `/api/files/search?search=${searchString}&column=${
            sorting.element
          }&order=${
            sorting.order === 'asc' ? 'desc' : 'asc'
          }&rowsPerPage=${rowsPerPage}&start=${0}`
        )
        .then((data) => {
          dispatch(searchFilesActions.setSearchString(searchString))
          dispatch(
            filesActions.setFilesData({
              files: data.data.files,
              countOfFilesInFolder: data.data.countOfFilesInFolder,
            })
          )
        })
        .catch((err) => console.log(err))
    }
  }

  const onClickColumn = (column) => {
    dispatch(
      sortingActions.setSortType({
        element: column,
        order: sorting.order,
      })
    )
    sortFiles(column)
  }

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={mainCheckerActive}
          sx={{
            color: 'primary.orange',
            '&.Mui-checked': {
              color: 'primary.orange',
            },
          }}
          onClick={(e) => {
            e.stopPropagation()
          }}
          onChange={() => {
            setMainCheckerActive((mainCheckerActive) => {
              dispatch(selectedFilesActions.selectFiles(files))
              return !mainCheckerActive
            })
          }}
        />
      </TableCell>
      <GoBack />
      <FilesHeaderItem
        onClickColumn={onClickColumn}
        clickColumn={'name'}
        title={'Title'}
        order={sorting.order}
        element={sorting.element}
      />
      <FilesHeaderItem
        onClickColumn={onClickColumn}
        clickColumn={'size'}
        title={'File size'}
        order={sorting.order}
        element={sorting.element}
      />
      <FilesHeaderItem
        onClickColumn={onClickColumn}
        clickColumn={'created_at'}
        title={'Added'}
        order={sorting.order}
        element={sorting.element}
      />
      <TableCell></TableCell>
    </TableRow>
  )
}

FilesHeader.propTypes = {
  file: PropTypes.object,
  idx: PropTypes.number,
}
