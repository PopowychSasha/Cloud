import { Box, Button, Typography } from '@mui/material'
import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../../components/Message/Message'
import $api from '../../http/request'
import { setUserInfo } from '../../redux/thunk/setUserInfo'
import { userActions } from '../../redux/user'

function StartingPage() {
  const user = useSelector((store) => store.userReducer)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(setUserInfo())
  }, [])
  return (
    <Typography>
      <Box>{user.isLoggedIn && JSON.stringify(user)}</Box>
      <Button
        variant="contained"
        color="success"
        sx={{ marginTop: 5 }}
        onClick={() => {
          localStorage.removeItem('accessToken')
          dispatch(userActions.clearUserData())
          $api('/api/logout').then(() => {
            navigate('/')
          })
        }}
      >
        LogOut
      </Button>
      <Message />
    </Typography>
  )
}

export default StartingPage
