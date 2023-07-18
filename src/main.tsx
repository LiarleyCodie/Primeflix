import React from 'react'
import ReactDOM from 'react-dom/client'
import './reset.css'

import { Home } from './pages/Home'
import { Router } from './Routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
