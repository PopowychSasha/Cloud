import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import { Toolbar } from '@mui/material'
import { Image } from 'mui-image'
import logo from '../../image/logo.png'
import avatar from '../../image/avatar.png'
import headerLine from '../../image/header_line.png'
import logout from '../../image/logout.png'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../redux/user'
import $api from '../../http/request'
import { useNavigate } from 'react-router-dom'
import { filesActions } from '../../redux/files'

// eslint-disable-next-line no-unused-vars
function Header({ folderStack }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn } = useSelector((store) => store.userReducer)

  const logoutFn = () => {
    folderStack = [null]
    localStorage.removeItem('accessToken')
    dispatch(userActions.clearUserData())
    dispatch(filesActions.clearFilesData())
    $api('/api/logout').then(() => {
      navigate('/')
    })
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Image width={88} height={42} src={logo} alt="logo" />
        {isLoggedIn ? (
          <Image
            width={40}
            height={40}
            src={logout}
            alt="logout"
            style={{ cursor: 'pointer' }}
            onClick={logoutFn}
          />
        ) : (
          <Image width={40} height={40} src={avatar} alt="ws" />
        )}
      </Toolbar>
      <Image src={headerLine} alt="line" />
    </AppBar>
  )
}

Header.propTypes = {
  folderStack: PropTypes.array,
}

export default Header
