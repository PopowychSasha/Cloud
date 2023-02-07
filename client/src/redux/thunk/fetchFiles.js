import { message } from '../../components/Message/Message'
import $api from '../../http/request'
import { fileActions } from '../file'

function fetchFiles({ parendFolderId }) {
  return (dispatch) => {
    $api
      .get(`/api/folder/${parendFolderId}`)
      .then((data) => {
        if (data) {
          dispatch(fileActions.setFilesData(data.data))
        }
      })
      .catch((err) => {
        message({ info: err.message, status: 'error' })
      })
  }
}
export { fetchFiles }
