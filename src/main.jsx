import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#00B4E7',
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: [
      'Inter',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
