import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CoachingPage from './CoachingPage.tsx'
import './index.css'
import './coaching.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CoachingPage />
  </StrictMode>,
)
