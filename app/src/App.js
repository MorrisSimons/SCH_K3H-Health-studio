import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Views from './views'
function App () {
  return (
    <BrowserRouter>
      <Views />
    </BrowserRouter>
  )
}

export default App
