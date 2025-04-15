import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Signin from './components/Signin.jsx'
import Main from './components/Main.jsx'
import { BrowserRouter } from 'react-router-dom'
// import Rightpanel from './components/Rightpanel.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    {/* <Rightpanel/> */}
    <App/>
    {/* <Rightpanel/> */}

    </BrowserRouter>
  </StrictMode>
)
