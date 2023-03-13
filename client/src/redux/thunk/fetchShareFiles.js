import { message } from '../../components/Message/Message'
import $api from '../../http/request'
import { filesActions } from '../files'

function fetchShareFiles({ element, order, rowsPerPage = null, start = 0 }) {
  return (dispatch) => {
    $api
      .get(
        `/api/files/share?column=${element}&order=${order}&rowsPerPage=${rowsPerPage}&start=${start}`
      )
      .then((data) => {
        if (data) {
          dispatch(filesActions.setFilesData(data.data))
        }
      })
      .catch((err) => {
        message({ info: err.message, status: 'error' })
      })
  }
}
export { fetchShareFiles }
