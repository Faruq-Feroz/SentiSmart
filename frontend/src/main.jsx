// Add this import
import './styles/mpesa.css';
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css' // Make sure Bootstrap CSS is imported
import './styles/donations.css' // Import your custom CSS
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)