import { userActions } from '../user'
import jwt_decode from 'jwt-decode'

function checkAuth() {
  return (dispatch) => {
    try {
      jwt_decode(localStorage.getItem('accessToken'))
      dispatch(userActions.setIsLoggedIn({ value: true }))
    } catch (err) {
      dispatch(userActions.setIsLoggedIn({ value: false }))
    }
  }
}
export { checkAuth }
