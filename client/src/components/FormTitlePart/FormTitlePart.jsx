import { Button, Typography } from '@mui/material'
import Image from 'mui-image'
import active_link_line from '../../image/active_link_line.png'
import un_active_link_line from '../../image/un_active_link_line.png'

function FormTitlePart({ title, formToggle, setFormToggle }) {
  return (
    <Button
      sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}
      onClick={() => setFormToggle((value) => !value)}
    >
      <Typography sx={{ color: 'primary.orange' }}>{title}</Typography>
      <Image
        src={formToggle ? active_link_line : un_active_link_line}
        height={2}
        style={{ marginTop: '21px' }}
      />
    </Button>
  )
}

export default FormTitlePart
