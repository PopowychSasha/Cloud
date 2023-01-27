import AppBar from '@mui/material/AppBar'
import { Toolbar } from '@mui/material'
import { Image } from 'mui-image'
import logo from '../../image/logo.png'
import avatar from '../../image/avatar.png'
import header_line from '../../image/header_line.png'

function Header() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Image width={88} height={42} src={logo} alt="logo" />
        <Image width={40} height={40} src={avatar} alt="ws" />
      </Toolbar>
      <Image src={header_line} alt="line" />
    </AppBar>
  )
}
export default Header
