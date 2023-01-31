import FormInput from '../components/FormInput/FormInput'
import Email from '@mui/icons-material/Email'

export default {
  title: 'Inputs',
  component: <FormInput />,
}

const Template = (args) => <FormInput {...args} />

export const Input = Template.bind({})
Input.args = {
  title: 'Email',
  Email,
  type: 'text',
  value: 'user@gmail.com',
  setValue: () => {},
}
