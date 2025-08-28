import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import backgroundImage from './img/fondo.jpg'
import { TemperatureProvider } from './context/TemperatureContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TemperatureProvider>
      <App />
    </TemperatureProvider>
  </StrictMode>,
)
