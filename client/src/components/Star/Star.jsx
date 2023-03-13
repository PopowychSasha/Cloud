import { useDispatch } from 'react-redux'
import $api from '../../http/request'
import { filesActions } from '../../redux/files'
import StarIcon from '@mui/icons-material/Star'

function Star({ file }) {
  const dispatch = useDispatch()
  const favoriteFileHandler = () => {
    if (!file.isFolder) {
      $api
        .patch(`/api/file/favorites/${file.id}`)
        .then(() => {
          dispatch(
            filesActions.favoriteFileToggle({
              id: file.id,
              isFolder: file.isFolder,
            })
          )
        })
        .catch((err) => console.log(err))
    }
  }
  return (
    <StarIcon
      sx={{
        opacity: file.isFolder ? '0' : file.isFavorite ? '1' : '0.2',
        cursor: 'pointer',
        pr: 1,
        color: file.isFavorite ? 'yellow' : '#FFF',
      }}
      onClick={favoriteFileHandler}
    />
  )
}

export default Star
