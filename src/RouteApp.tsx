import './App.css'
import { Route, Routes } from 'react-router-dom'
import App from './App'
import ViewPage from './components/modal/ViewPage'

function RouteApp() {
  return (
    <Routes>
        <Route path='/' element={<App />} />
        <Route path='/details/:id' element={<ViewPage />} />
    </Routes>
  )
}

export default RouteApp
