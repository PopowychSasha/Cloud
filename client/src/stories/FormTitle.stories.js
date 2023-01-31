import FormTitle from '../components/FormTitle/FormTitle'

export default {
  title: 'FormTitle',
  component: <FormTitle />,
  argsTypes: { setFormToggle: { action: 'setFormToggle' } },
}

const Template = (args) => <FormTitle {...args} />

export const SignInActive = Template.bind({})
SignInActive.args = {
  formToggle: true,
  setFormToggle: () => {},
}

export const SignUpActive = Template.bind({})
SignUpActive.args = {
  formToggle: false,
  setFormToggle: () => {},
}
