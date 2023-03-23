import { IconButton, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { useRef, useState } from 'react'
import $api from '../../http/request'
import { useDispatch, useSelector } from 'react-redux'
import { filesActions } from '../../redux/files'
import { searchFilesActions } from '../../redux/searchFiles'
import { fetchFiles } from '../../redux/thunk/fetchFiles'

function SearchFiles() {
  const [fileName, setFileName] = useState('')
  const dispatch = useDispatch()
  const inputRef = useRef(null)

  const sorting = useSelector((store) => store.sortingReducer)
  const { rowsPerPage } = useSelector((store) => store.filesReducer)
  const folderStack = useSelector((store) => store.folderStackReducer)

  const fetchFilesFromCurrentFolder = () => {
    dispatch(
      fetchFiles({
        parendFolderId: folderStack[folderStack.length - 1],
        element: sorting.element,
        order: sorting.order,
        rowsPerPage: rowsPerPage,
      })
    )
  }
  const searchFilesHandler = (value) => {
    if (value.length > 0) {
      $api
        .get(
          `/api/files/search?search=${value}&column=${sorting.element}&order=${
            sorting.order
          }&rowsPerPage=${rowsPerPage}&start=${0}`
        )
        .then((data) => {
          console.log(data.data)
          setFileName(value)
          dispatch(searchFilesActions.setSearchString(value))
          dispatch(
            filesActions.setFilesData({
              files: data.data.files,
              countOfFilesInFolder: data.data.countOfFilesInFolder,
            })
          )
        })
        .catch((err) => console.log(err))
    } else {
      dispatch(searchFilesActions.setSearchString(''))
      fetchFilesFromCurrentFolder()
    }
  }

  const clearSearchField = () => {
    inputRef.current.value = ''
    dispatch(searchFilesActions.setSearchString(''))
    fetchFilesFromCurrentFolder()
  }

  const searchDebounce = (fn, ms) => {
    let timeout
    return function (e) {
      const fnCall = () => fn.call(this, e.target.value)
      clearTimeout(timeout)
      timeout = setTimeout(fnCall, ms)
    }
  }
  return (
    <TextField
      variant="outlined"
      id="outlined-size-small"
      size="small"
      placeholder="file search"
      sx={{
        backgroundColor: '#FFF',
        width: '90%',
        display: 'block',
        margin: 'auto',
        mt: 4,
        borderRadius: '10px',
      }}
      inputRef={inputRef}
      onChange={searchDebounce(searchFilesHandler, 1000)}
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <IconButton>
              {fileName.length === 0 ? (
                <SearchIcon />
              ) : (
                <ClearIcon onClick={() => clearSearchField()} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default SearchFiles
