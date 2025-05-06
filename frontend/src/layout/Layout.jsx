import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { Box } from '@mui/material'

const Layout = () => {
  return (
    <>
      <NavBar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'primary.dark', margin: '5px', borderRadius: '20px', }}>
        <Outlet />
      </Box>
    </>
  )
}

export default Layout