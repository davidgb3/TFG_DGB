import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ThemeProvider } from './context/ThemeContext'
import { AnimatePresence } from 'framer-motion'

const App = () => {
  return (
    <ThemeProvider>
      <AnimatePresence mode='wait'>
        <RouterProvider router={router} />  
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default App