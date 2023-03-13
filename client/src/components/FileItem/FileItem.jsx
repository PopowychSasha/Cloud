/* eslint-disable no-prototype-builtins */
import PropTypes from 'prop-types'
import { Box, Checkbox, TableCell, TableRow, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFiles } from '../../redux/thunk/fetchFiles'
import fileIcon from '../../image/file.png'
import folderIcon from '../../image/folder.png'
import Image from 'mui-image'
import DownloadIcon from '@mui/icons-material/Download'
import $api from '../../http/request'
import fileDownload from 'js-file-download'
import { FilesHeader } from '../FilesHeader/FilesHeader'
import moment from 'moment'
import prettyBytes from 'pretty-bytes'
import { useState } from 'react'
import { selectedFilesActions } from '../../redux/selectedFiles'
import { folderStackActions } from '../../redux/folderStack'
import Preloader from '../Preloader/Preloader'
import Star from '../Star/Star'
import './FileItem.css'
import EditName from '../EditName/EditName'

function FileItem({ file, idx }) {
  const dispatch = useDispatch()
  const [checkedToggle, setCheckedToggle] = useState(false)
  const [showPreloader, setShowPreloader] = useState(false)
  const sorting = useSelector((store) => store.sortingReducer)
  const { rowsPerPage } = useSelector((store) => store.filesReducer)

  const { isAllFilesSelected } = useSelector(
    (store) => store.selectedFilesReducer
  )

  const downloadFile = async (id) => {
    setShowPreloader(true)
    $api(`/api/file/${id}`, {
      responseType: 'blob',
    })
      .then((response) => {
        fileDownload(response.data, file.name)
        setShowPreloader(false)
      })
      .catch((err) => console.log(err))
  }

  const onChangeCheckbox = () => {
    setCheckedToggle((checkedToggle) => {
      if (isAllFilesSelected) {
        return checkedToggle
      }
      if (!checkedToggle) {
        dispatch(selectedFilesActions.selectFile(file))
      } else {
        dispatch(selectedFilesActions.deleteSelectedFile(file))
      }
      return !checkedToggle
    })
  }

  return (
    <>
      {idx === 0 && <FilesHeader />}
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
            dispatch(folderStackActions.goToFolder(file.id))
            dispatch(selectedFilesActions.clearFilesData())
            dispatch(
              fetchFiles({
                parendFolderId: file.id,
                element: sorting.element,
                order: sorting.order,
                rowsPerPage: rowsPerPage,
              })
            )
          }
        }}
      >
        <TableCell>
          <Checkbox
            checked={isAllFilesSelected ? isAllFilesSelected : checkedToggle}
            sx={{
              color: 'primary.orange',
              '&.Mui-checked': {
                color: 'primary.orange',
              },
            }}
            onClick={(e) => {
              e.stopPropagation()
            }}
            onChange={onChangeCheckbox}
          />
        </TableCell>
        <TableCell align="center">
          <Image
            src={file.isFolder ? folderIcon : fileIcon}
            height={40}
            width={40}
          />
        </TableCell>
        <TableCell
          align="center"
          sx={{ color: '#FFF' }}
          onClick={(e) => e.stopPropagation()}
        >
          {!file.hasOwnProperty('readonly') ||
          (file.hasOwnProperty('readonly') && !file.readonly) ? (
            <Box sx={{ display: 'flex' }}>
              <Star file={file} />
              <Box title="rename file">
                <EditName file={file} />
              </Box>
            </Box>
          ) : (
            <Typography sx={{ display: 'flex' }}>
              <Star file={file} />
              <Box title="renaming is not allowed">{file.name}</Box>
            </Typography>
          )}
        </TableCell>
        <TableCell align="center" sx={{ color: '#FFF' }}>
          {!file.isFolder && prettyBytes(file.size)}
        </TableCell>
        <TableCell align="center" sx={{ color: '#FFF' }}>
          {moment(file.created_at).format('MM Do YY, h:mm:ss a')}
        </TableCell>
        {!file.isFolder ? (
          <TableCell align="center" sx={{ color: '#FFF' }}>
            <DownloadIcon
              sx={{
                cursor: 'pointer',
                visibility: file.isFolder && 'hidden',
              }}
              onClick={() => downloadFile(file.id)}
            />
          </TableCell>
        ) : (
          <>
            <TableCell></TableCell>
          </>
        )}

        <Preloader showPreloader={showPreloader} />
      </TableRow>
    </>
  )
}

FileItem.propTypes = {
  file: PropTypes.object,
  idx: PropTypes.number,
}

export default FileItem
