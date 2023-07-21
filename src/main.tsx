import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer, cssTransition } from 'react-toastify'
import { Router } from './Routes'

const slide = cssTransition({
  enter: 'slideIn',
  exit: 'slideOut',
})

import './reset.css'
import './animations.css'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer
      position="bottom-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      transition={slide}
      style={{ fontFamily: 'Poppins', fontSize: '1.6rem' }}
    />
    <Router />
  </React.StrictMode>,
)
