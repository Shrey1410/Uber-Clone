import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import SocketProvider from './context/SocketContext.jsx'
import UserProvider from './context/UserContext.jsx'
import CaptainProvider from './context/CaptainContext.jsx'
import RideProvider from './context/RideContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RideProvider>
    <CaptainProvider>
        <UserProvider>
          <SocketProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SocketProvider>
        </UserProvider>
    </CaptainProvider>
    </RideProvider>
  </StrictMode>,
)
