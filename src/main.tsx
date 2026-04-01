import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import RouteApp from './RouteApp.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <RouteApp />
  </BrowserRouter>
)
