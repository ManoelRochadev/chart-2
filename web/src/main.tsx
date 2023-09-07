import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Teste from './Teste.tsx'
// import './index.css'
import './my_style.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
ReactDOM.createRoot(document.getElementById('teste') as HTMLElement).render(
  <React.StrictMode>
    <Teste />
  </React.StrictMode>,
)
