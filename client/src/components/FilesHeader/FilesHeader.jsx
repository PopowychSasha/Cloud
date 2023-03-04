import { Checkbox, TableCell, TableRow, Typography } from '@mui/material'
import Image from 'mui-image'
import sort from '../../image/sort.png'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { selectedFilesActions } from '../../redux/selectedFiles'
import { GoBack } from '../GoBack/GoBack'

export function FilesHeader() {
  const dispatch = useDispatch()
  const files = useSelector((store) => store.fileReducer)
  const [mainCheckerActive, setMainCheckerActive] = useState(false)

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
      <TableCell
        align="center"
        sx={{
          color: 'primary.orange',
          cursor: 'pointer',
          '&:hover': {
            background: '#344174',
          },
        }}
      >
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Title{' '}
          <Image
            src={sort}
            alt="<"
            width={10}
            height={15}
            style={{ cursor: 'pointer', marginLeft: 5 }}
          />
        </Typography>
      </TableCell>
      <TableCell
        align="center"
        sx={{
          color: 'primary.orange',
          cursor: 'pointer',
          '&:hover': {
            background: '#344174',
          },
        }}
      >
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          File size
          <Image
            src={sort}
            alt="<"
            width={10}
            height={15}
            style={{ cursor: 'pointer', marginLeft: 5 }}
          />
        </Typography>
      </TableCell>
      <TableCell
        align="center"
        sx={{
          color: 'primary.orange',
          cursor: 'pointer',
          '&:hover': {
            background: '#344174',
          },
        }}
      >
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Added
          <Image
            src={sort}
            alt="<"
            width={10}
            height={15}
            style={{ cursor: 'pointer', marginLeft: 5 }}
          />
        </Typography>
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  )
}

FilesHeader.propTypes = {
  file: PropTypes.object,
  idx: PropTypes.number,
}
