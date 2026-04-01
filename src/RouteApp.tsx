import './App.css'
import { Route, Routes } from 'react-router-dom'
import App from './App'
import ViewPage from './components/modal/ViewPage'
import AddLinkWord from './components/link/AddLinkWord'

function RouteApp() {
  return (
    <Routes>
        <Route path='/' element={<App />} />
        <Route path='/details/:id' element={<ViewPage />} />
        <Route path='/add/linkword/:id' element={<AddLinkWord />} />
    </Routes>
  )
}

export default RouteApp
