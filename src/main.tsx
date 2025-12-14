import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'  // <-- CHANGED TO HashRouter
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter basename="/cinemascope">  {/* Still keep basename */}
      <App />
    </HashRouter>
  </StrictMode>,
)