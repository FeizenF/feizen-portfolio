import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/rajdhani/latin-400.css'
import '@fontsource/rajdhani/latin-500.css'
import '@fontsource/rajdhani/latin-600.css'
import '@fontsource/rajdhani/latin-700.css'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/geist'
import './styles/global.css'
import './styles/typography.css'
import './styles/animations.css'
import './styles/sections.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
