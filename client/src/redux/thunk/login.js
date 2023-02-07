import { message } from '../../components/Message/Message'
import $api from '../../http/request'
import { userActions } from '../user'

function loginUser({ email, setEmail, password, setPassword, navigate }) {
  return (dispatch) => {
    $api
      .post('/api/authentication', { email, password })
      .then((data) => {
        if (data) {
          dispatch(userActions.setUserData(data.data))
          localStorage.setItem('accessToken', data.data.accessToken)

          setEmail('')
          setPassword('')
          message({
            info: 'You have logged in successfully',
            status: 'success',
          })

          setTimeout(() => {
            navigate('/account')
          }, 2000)
        }
      })
      .catch((err) => {
        message({ info: err.message, status: 'error' })
      })
  }
}
export { loginUser }
