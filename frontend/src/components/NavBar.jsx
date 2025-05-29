import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Box } from '@mui/material';
import Switch from '@mui/material/Switch';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '../context/ThemeContext';

const NavBar = () => {
   const { isAuthenticated, logout } = useAuth();
   const { user } = useAuth();
   const { mode, toggleTheme } = useTheme();

   const username = user ? user.user : 'Guest';
   const userPfp = username ? username.charAt(0).toUpperCase() : '?';

   const navigate = useNavigate();
   const handleLogout = () => {
        logout();
        navigate('/login'); 
   }

   const handleProfile = () => {
        navigate('/userProfile');
   }

   const handleHome = () => {
        navigate('/');
   }

   const handleProjects = () => {
        navigate('/projects');
   }

   const handleManageUsers = () => {
        navigate('/manageUsers');
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
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4px', justifyContent: 'flex-start', alignItems: 'center' }}>
            <img 
              onClick={handleHome} 
              className='cursor-pointer' 
              width='150px' 
              src="../../image2.svg" 
              alt="Nimbus Notes Logo" 
              style={{
                filter: mode === 'dark' ? 'invert(0)' : 'invert(1)',
                transition: 'filter 0.3s ease-in-out'
              }}
            />
            <Button 
              onClick={handleHome} 
              variant='contained' 
              sx={{
                backgroundColor: 'crimson',
                fontFamily: 'Nothing',
                borderRadius: '50px 10px 10px 50px',
                padding: '9px',
                color: 'text.primary',
                transition: 'filter 0.3s ease-in-out',
                '&:hover': {
                  fontWeight: 'bold',
                  color: 'white',
                  backgroundColor: 'darkred'
                }
              }}
            >
              My Notes
            </Button>
            <Button 
              onClick={handleProjects} 
              variant='contained' 
              sx={{
                backgroundColor: 'crimson',
                fontFamily: 'Nothing',
                borderRadius: '10px 50px 50px 10px',
                padding: '9px',
                color: 'text.primary',
                transition: 'filter 0.3s ease-in-out',
                '&:hover': {
                  fontWeight: 'bold',
                  color: 'white',
                  backgroundColor: 'darkred'
                }
              }}
            >
              Projects
            </Button>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'row',
            alignItems: 'center',
            gap: user?.role !== 'admin' ? 1 : 0.5,
          }}>
            <Box>
              {mode === 'dark' ? (
                <DarkModeIcon sx={{ color: 'text.primary', fontSize: 30 }}/>
              ) : (
                <LightModeIcon sx={{ color: 'text.primary', fontSize: 30 }}/>
              )}
              <Switch 
                checked={mode === 'light'}
                onChange={toggleTheme}
                sx={{ 
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
                  },
                  '& .MuiSwitch-track': {
                    backgroundColor: 'primary.light',
                    opacity: 1,
                    borderRadius: 20,
                  }
                }}
              />
            </Box>
            <Avatar onClick={ handleProfile } sx={{ bgcolor: 'text.primary', color: 'primary.main', fontFamily: 'Nothing', cursor: 'pointer', 
            '&:hover': {filter: 'opacity(75%)'}, transition: 'all 0.3s ease-in-out', marginRight: "5px" }}>{userPfp}</Avatar>
            
            {/* Añadir el botón de Admin si el usuario es admin */}
            {user?.role === 'admin' && (
              <Button 
                onClick={handleManageUsers}
                variant='contained' 
                sx={{
                  backgroundColor: 'crimson',
                  fontFamily: 'Nothing',
                  borderRadius: user?.role === 'admin' ? '50px 10px 10px 50px' : '10px',
                  padding: '9px',
                  color: 'text.primary',
                  transition: 'filter 0.3s ease-in-out',
                  '&:hover': {
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: 'darkred'
                  }
                }}
              >
                Manage Users
              </Button>
            )}
            
            <Button 
              onClick={handleLogout} 
              variant='contained' 
              sx={{
                backgroundColor: 'crimson',
                fontFamily: 'Nothing',
                borderRadius: user?.role === 'admin' ? '10px 50px 50px 10px' : '50px',
                padding: '9px',
                color: 'text.primary',
                transition: 'filter 0.3s ease-in-out',
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
          <img 
            onClick={handleHome} 
            className='cursor-pointer' 
            width='150px' 
            src="../../image2.svg" 
            alt="Nimbus Notes Logo"
            style={{
              filter: mode === 'dark' ? 'invert(0)' : 'invert(1)',
              transition: 'filter 0.3s ease-in-out'
            }}
          />
          <Box>
            {mode === 'dark' ? (
              <DarkModeIcon sx={{ color: 'text.primary', fontSize: 30 }}/>
            ) : (
              <LightModeIcon sx={{ color: 'text.primary', fontSize: 30 }}/>
            )}
            <Switch 
              checked={mode === 'light'}
              onChange={toggleTheme}
              sx={{ 
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
                },
                '& .MuiSwitch-track': {
                  backgroundColor: 'primary.light',
                  opacity: 1,
                  borderRadius: 20,
                }
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default NavBar