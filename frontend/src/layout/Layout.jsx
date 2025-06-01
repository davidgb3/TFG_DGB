import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { Box } from '@mui/material'

const Layout = () => {
  return (
    <Box sx={{ 
      height: 'screen',
      overflow: 'hidden',
      backgroundColor: 'primary.dark',
    }}>
      <NavBar />
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: 'calc(100vh)', // Altura total menos la altura del NavBar
          backgroundColor: 'primary.dark', 
          margin: '5px', 
          borderRadius: '20px', 
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout