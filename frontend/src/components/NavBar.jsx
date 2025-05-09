import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Box } from '@mui/material';
import NewNoteModal from './NewNoteModal';
import Switch from '@mui/material/Switch';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

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
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'flex-start', alignItems: 'center' }}>
            <img width='150px' src="../../image2.png" alt="Nimbus Notes Logo" />
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
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <img width='150px' src="../../image2.png" alt="Nimbus Notes Logo" />
          <Box>
            <DarkModeIcon sx={{ color: 'white', fontSize: 30 }}/>
            <Switch sx={{ 
                '& .MuiSwitch-switchBase': {
                    padding: 1,
                    '&.Mui-checked': {
                        '& + .MuiSwitch-track': {
                            backgroundColor: 'accent',
                            opacity: 1,
                        },
                        '& .MuiSwitch-thumb': {
                            backgroundColor: 'text.primary',
                        }
                    }
                },
                '& .MuiSwitch-thumb': {
                    backgroundColor: 'accent',
                    width: 24,
                    height: 24,
                    '&:before': {
                        content: "''",
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        left: 0,
                        top: 0,
                        backgroundImage: `url(${LightModeIcon})`,
                        backgroundSize: '14px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }
                },
                '& .MuiSwitch-track': {
                    backgroundColor: 'primary.light',
                    opacity: 1,
                    borderRadius: 20,
                }
              }}/>
              <LightModeIcon sx={{ color: 'white', fontSize: 30 }}/>
            </Box>
        </Box>
      )}
    </Box>
  )
}

export default NavBar