import { Box } from '@mui/material'
import FormTitlePart from '../FormTitlePart/FormTitlePart'

function FormTitle({ formToggle, setFormToggle }) {
  return (
    <Box sx={{ display: 'flex', marginBottom: 2 }}>
      <FormTitlePart
        title="SIGN UP"
        formToggle={formToggle}
        setFormToggle={setFormToggle}
      />
      <FormTitlePart
        title="SIGN UP"
        formToggle={!formToggle}
        setFormToggle={setFormToggle}
      />
    </Box>
  )
}

export default FormTitle
