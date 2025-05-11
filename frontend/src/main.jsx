import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from '@emotion/react'
import { theme } from './styles/Theme.jsx'
import { CssBaseline } from '@mui/material'
import { NoteProvider } from './context/NoteContext.jsx'
import { UserProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <UserProvider>
          <NoteProvider>
            <CssBaseline />
            <App />
          </NoteProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
