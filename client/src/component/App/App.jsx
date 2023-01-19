import { useRoutes } from 'react-router-dom'
import AuthPage from '../../pages/AuthPage/AuthPage'
import './App.css'

const App = () => {
  const routes = useRoutes([{ path: '/', element: <AuthPage /> }])
  return routes
}

export default App
