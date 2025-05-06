import React from 'react'
import { Outlet, RouterProvider } from 'react-router-dom'
import { router } from './router'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App