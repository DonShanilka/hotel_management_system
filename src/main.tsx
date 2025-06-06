import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-blue-500">Hello Shanilka</h1>
    </div> */}
  </StrictMode>
)
