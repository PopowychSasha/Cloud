import { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRoutes } from 'react-router-dom'
import AuthPage from '../../pages/AuthPage/AuthPage'
import StartingPage from '../../pages/StartingPage/StartingPage'
import { useDispatch } from 'react-redux'
import { checkAuth } from '../../redux/thunk/checkAuth'
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage'
import AccountActivationPage from '../../pages/AccountActivationPage/AccountActivationPage'

const App = () => {
  const isLoggedIn = useSelector((store) => store.userReducer.isLoggedIn)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(checkAuth())
  }, [])

  const publicRoute = [
    { path: '/', element: <AuthPage /> },
    { path: '/reset_password/:token', element: <ResetPasswordPage /> },
    { path: '/activation/:token', element: <AccountActivationPage /> },
  ]
  const privateRoute = [
    ...publicRoute,
    { path: '/account', element: <StartingPage /> },
  ]

  const routes = useRoutes(isLoggedIn ? privateRoute : publicRoute)

  return routes
}

export default App
