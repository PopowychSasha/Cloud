import { render, jsx } from '../lib/setUpComponents.js'

const App = () => {
  return (
    <div>
      <div>Title</div>
      <div>Content</div>
    </div>
  )
}

render(<App></App>, document.getElementById('root'))
