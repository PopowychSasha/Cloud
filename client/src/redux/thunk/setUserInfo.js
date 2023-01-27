import { message } from '../../components/Message/Message'
import $api from '../../http/request'
import { userActions } from '../user'

function setUserInfo() {
  return (dispatch) => {
    $api
      .get('/api/user')
      .then((data) => {
        if (data) {
          dispatch(userActions.setUserData(data.data))
        }
      })
      .catch((err) => message({ info: err.message, status: 'error' }))
  }
}
export { setUserInfo }
