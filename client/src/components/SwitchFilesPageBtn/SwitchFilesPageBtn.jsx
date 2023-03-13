import { useDispatch, useSelector } from 'react-redux'
import Image from 'mui-image'
import goBackImg from '../../image/go_back.png'
import { fetchFiles } from '../../redux/thunk/fetchFiles'
import { fetchShareFiles } from '../../redux/thunk/fetchShareFiles'

function SwitchFilesPageBtn({
  start,
  setStart,
  setPageNumber,
  direction = 'forward',
  rotateDegrees = 0,
}) {
  const dispatch = useDispatch()

  const sorting = useSelector((store) => store.sortingReducer)
  const { countOfFilesInFolder } = useSelector((store) => store.filesReducer)
  const folderStack = useSelector((store) => store.folderStackReducer)
  const { rowsPerPage } = useSelector((store) => store.filesReducer)
  const filesType = useSelector((store) => store.filesType.active)
  return (
    <Image
      src={goBackImg}
      alt="<"
      onClick={() => {
        if (
          (direction === 'forward' &&
            start + rowsPerPage < countOfFilesInFolder &&
            filesType === 'USER_FILES') ||
          (direction === 'back' &&
            start - rowsPerPage >= 0 &&
            filesType === 'USER_FILES')
        ) {
          dispatch(
            fetchFiles({
              parendFolderId: folderStack[folderStack.length - 1],
              element: sorting.element,
              order: sorting.order,
              rowsPerPage: rowsPerPage,
              start:
                direction === 'forward'
                  ? start + rowsPerPage
                  : start - rowsPerPage,
            })
          )
        } else if (
          (direction === 'forward' &&
            start + rowsPerPage < countOfFilesInFolder &&
            filesType === 'SHARED_FILES') ||
          (direction === 'back' &&
            start - rowsPerPage >= 0 &&
            filesType === 'SHARED_FILES')
        ) {
          dispatch(
            fetchShareFiles({
              element: sorting.element,
              order: sorting.order,
              rowsPerPage: rowsPerPage,
              start:
                direction === 'forward'
                  ? start + rowsPerPage
                  : start - rowsPerPage,
            })
          )
        }
        if (
          (filesType === 'USER_FILES' || filesType === 'SHARED_FILES') &&
          start + rowsPerPage < countOfFilesInFolder &&
          direction === 'forward'
        ) {
          setStart((start) => start + rowsPerPage)
          setPageNumber((number) => number + 1)
        } else if (
          (filesType === 'USER_FILES' || filesType === 'SHARED_FILES') &&
          start - rowsPerPage >= 0 &&
          direction === 'back'
        ) {
          setStart((start) => start - rowsPerPage)
          setPageNumber((number) => number - 1)
        }
      }}
      width={10}
      height={15}
      style={{
        cursor: 'pointer',
        transform: `rotate(${rotateDegrees}deg)`,
        marginLeft: 10,
      }}
    />
  )
}

export default SwitchFilesPageBtn
