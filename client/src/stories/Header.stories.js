import Header from '../share/Header/Header'

export default {
  title: 'Header',
  component: <Header />,
}

const Template = (args) => <Header {...args} />

export const AppHeader = Template.bind({})
AppHeader.args = {}
