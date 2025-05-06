import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from '@emotion/react'
import { theme } from './styles/theme.jsx'
import { CssBaseline } from '@mui/material'
import { NoteProvider } from './context/NoteContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <NoteProvider>
          <CssBaseline />
          <App />
        </NoteProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
