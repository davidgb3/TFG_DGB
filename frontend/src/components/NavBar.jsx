import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Box } from '@mui/material';
import NewNoteModal from './NewNoteModal';

const NavBar = () => {
   const { isAuthenticated, logout } = useAuth();
   const { user } = useAuth();

   const userPfp = user ? user.charAt(0).toUpperCase() : '?';

   const navigate = useNavigate();
   const handleLogout = () => {
        logout();
        navigate('/login'); 
   }

  return (
    <Box
      component="nav" 
      sx={{ 
        backgroundColor: 'primary.main',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 2,
        alignItems: 'center',
        padding: 2,
        color: 'white',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24
      }}
    >
      {isAuthenticated ? (
        <div className='flex flex-row gap-2 justify-between items-center w-full'>
          <Box>
            <NewNoteModal/>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2
          }}>
            <Avatar sx={{ bgcolor: 'white', color: 'primary.main', fontFamily: 'Nothing' }}>{userPfp}</Avatar>
            <Button 
              onClick={handleLogout} 
              variant='contained' 
              color="text.main"
              sx={{
                backgroundColor: 'crimson',
                fontFamily: 'Nothing',
                borderRadius: '50px',
                padding: '9px',
                color: 'text.main',
                '&:hover': {
                  fontWeight: 'bold',
                  color: 'white',
                  backgroundColor: 'darkred'
                }
              }}
            >
              Logout
            </Button>
          </Box>
        </div>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          
        </Box>
      )}
    </Box>
  )
}

export default NavBar