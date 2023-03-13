import { Box, Container } from '@mui/material'
import { useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ActionsMenu from '../../components/ActionsMenu/ActionsMenu'
import CreateFolderModal from '../../components/CreateFolderModal/CreateFolderModal'
import Details from '../../components/Details/Details'
import Files from '../../components/Files/Files'
import Message from '../../components/Message/Message'
import Header from '../../share/Header/Header'
import { setUserInfo } from '../../redux/thunk/setUserInfo'

function StartingPage() {
  const dispatch = useDispatch()

  const [createFolderOpen, setCreateFolderOpen] = useState(false)
  const handleOpen = () => setCreateFolderOpen(true)
  const handleClose = () => setCreateFolderOpen(false)

  useLayoutEffect(() => {
    dispatch(setUserInfo())
  }, [])

  const verticalLine = (
    <Box
      sx={{
        width: 3,
        backgroundColor: '#FA4616',
        minHeight: 'calc(100vh - 50px)',
      }}
    />
  )
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        border: 'solid',
        minWidth: '100%',
        height: '97vh',
        overflow: 'hidden',
      }}
    >
      <Header />
      <Container sx={{ display: 'flex' }}>
        {verticalLine}
        <ActionsMenu handleOpen={handleOpen} />
        {verticalLine}
        <Files />
        {verticalLine}
        <Details />
        {verticalLine}
      </Container>
      <CreateFolderModal
        createFolderOpen={createFolderOpen}
        handleClose={handleClose}
      />
      <Message />
    </Box>
  )
}

export default StartingPage
