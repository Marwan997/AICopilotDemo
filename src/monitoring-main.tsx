import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LocalMonitoringApp } from './monitoring'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalMonitoringApp />
  </StrictMode>,
)
