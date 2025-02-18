import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import MainRoutes from './MainRoutes'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <MainRoutes />
    </BrowserRouter>
  )
}

export default App
