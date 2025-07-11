import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CssBaseline } from '@mui/material'
import { NoteProvider } from './context/NoteContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { ProjectProvider } from './context/ProjectContext.jsx'
import { AdminProvider } from './context/AdminContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <AuthProvider>
        <AdminProvider>
          <ProjectProvider>
            <NoteProvider>
              <CssBaseline />
              <App />
            </NoteProvider>
          </ProjectProvider>
        </AdminProvider>
      </AuthProvider>
    </UserProvider>
  </StrictMode>,
)
