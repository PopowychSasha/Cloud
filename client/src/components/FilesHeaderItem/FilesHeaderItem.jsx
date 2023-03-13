import { TableCell, Typography } from '@mui/material'
import Image from 'mui-image'
import sort from '../../image/sort.png'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

function FilesHeaderItem({
  onClickColumn,
  clickColumn,
  title,
  order,
  element,
}) {
  const sorting = useSelector((store) => store.sortingReducer)

  return (
    <TableCell
      align="center"
      sx={{
        color: 'primary.orange',
        cursor: 'pointer',
        '&:hover': {
          background: '#344174',
        },
      }}
      onClick={() => onClickColumn(clickColumn)}
    >
      <Typography
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {title}
        {sorting.element === clickColumn && (
          <Image
            src={sort}
            alt="<"
            width={10}
            height={15}
            style={{
              cursor: 'pointer',
              marginLeft: 5,
              transform:
                order === 'desc' && element === clickColumn && 'rotate(180deg)',
            }}
          />
        )}
      </Typography>
    </TableCell>
  )
}

FilesHeaderItem.propTypes = {
  onClickColumn: PropTypes.func,
  clickColumn: PropTypes.string,
  title: PropTypes.string,
  order: PropTypes.string,
  element: PropTypes.string,
}

export default FilesHeaderItem
