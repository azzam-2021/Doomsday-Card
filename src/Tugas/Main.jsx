import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Tugas from './Tugas'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Tugas />
  </StrictMode>,
)