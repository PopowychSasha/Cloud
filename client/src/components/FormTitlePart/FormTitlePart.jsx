import PropTypes from 'prop-types'
import { Button, Typography } from '@mui/material'
import Image from 'mui-image'
import activeLinkLine from '../../image/active_link_line.png'
import unActiveLinkLine from '../../image/un_active_link_line.png'

function FormTitlePart({ title, formToggle, setFormToggle }) {
  return (
    <Button
      sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}
      onClick={() => setFormToggle((value) => !value)}
    >
      <Typography sx={{ color: 'primary.orange' }}>{title}</Typography>
      <Image
        src={formToggle ? activeLinkLine : unActiveLinkLine}
        height={2}
        style={{ marginTop: '21px' }}
      />
    </Button>
  )
}

FormTitlePart.propTypes = {
  title: PropTypes.string,
  formToggle: PropTypes.bool,
  setFormToggle: PropTypes.func,
}

export default FormTitlePart
