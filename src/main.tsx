/**
 * Browser entry point.
 *
 * Loads the global stylesheet and mounts <App /> into the #root element from
 * index.html. There is nothing else to configure here — see src/App.tsx.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
