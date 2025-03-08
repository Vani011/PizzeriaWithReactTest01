import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; // Importamos Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css'; // Aquí puedes tener estilos personalizados



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
