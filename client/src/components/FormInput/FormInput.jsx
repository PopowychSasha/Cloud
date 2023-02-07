import PropTypes from 'prop-types'
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'

function FormInput({ title, icon, type = 'text', value, setValue }) {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <FormControl
      variant="standard"
      sx={{ width: '65%', margin: 'auto', marginTop: 4 }}
    >
      <InputLabel
        htmlFor="input-with-icon-adornment"
        sx={{
          color: 'primary.orange',
        }}
      >
        {title}
      </InputLabel>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        startAdornment={
          <InputAdornment position="start">{icon}</InputAdornment>
        }
        endAdornment={
          type === 'password' && (
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {}}
              onMouseDown={() => {}}
              edge="end"
            >
              {passwordVisible ? (
                <Visibility
                  onClick={() => setPasswordVisible(false)}
                  sx={{ color: 'white' }}
                />
              ) : (
                <VisibilityOff
                  onClick={() => setPasswordVisible(true)}
                  sx={{ color: 'white' }}
                />
              )}
            </IconButton>
          )
        }
        sx={{ color: 'white' }}
        type={type === 'text' ? 'text' : passwordVisible ? 'text' : 'password'}
      />
    </FormControl>
  )
}

FormInput.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
}

export default FormInput
