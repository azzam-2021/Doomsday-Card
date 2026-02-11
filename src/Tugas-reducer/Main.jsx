import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TugasApp from './TugasApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TugasApp />
  </StrictMode>,
)