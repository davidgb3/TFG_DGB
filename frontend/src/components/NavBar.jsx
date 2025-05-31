import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Box, IconButton, Menu, MenuItem, useMediaQuery, useTheme as useMuiTheme } from '@mui/material';
import Switch from '@mui/material/Switch';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { user } = useAuth();
  const { mode, toggleTheme } = useTheme();
  const isMobile = useMediaQuery('(max-width:420px)');

  
  // Estado para el menú hamburguesa
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const MobileMenu = () => (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          backgroundColor: 'primary.dark',
          color: 'text.primary',
          borderRadius: '20px',
          padding: '0px',
          height: 'fit-content',
        }
      }}
    >
      {user?.role === 'admin' && (
        <MenuItem sx={{ fontFamily: 'Nothing', borderRadius: '15px 15px 5px 5px', '&:hover': { color: 'accent' }}} onClick={() => { handleManageUsers(); handleClose(); }}>
          Manage Users
        </MenuItem>
      )}
      <MenuItem sx={{ fontFamily: 'Nothing', borderRadius: '5px 5px 5px 5px', '&:hover': { color: 'accent' }}} onClick={() => { handleProfile(); handleClose(); }}>
        Profile
      </MenuItem>
      <MenuItem sx={{ fontFamily: 'Nothing', borderRadius: '5px 5px 15px 15px', backgroundColor: 'accent', '&:hover': { backgroundColor: 'darkred' }}} onClick={() => { handleLogout(); handleClose(); }}>
        Logout
      </MenuItem>
    </Menu>
  );

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
              width={isMobile ? '125px' : '150px'}
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
              size={isMobile ? "small" : "medium"}
              sx={{
                backgroundColor: 'crimson',
                fontFamily: 'Nothing',
                borderRadius: '50px 10px 10px 50px',
                padding: isMobile ? '6px' : '9px',
                color: 'text.primary',
                fontSize: isMobile ? '0.6rem' : '1rem',
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
              size={isMobile ? "small" : "medium"}
              sx={{
                backgroundColor: 'crimson',
                fontFamily: 'Nothing',
                borderRadius: '10px 50px 50px 10px',
                padding: isMobile ? '6px' : '9px',
                color: 'text.primary',
                fontSize: isMobile ? '0.6rem' : '1rem',
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
            width: "fit-content",
            flexDirection: 'row',
            alignItems: 'center',
            gap: 0.5,
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {mode === 'dark' ? (
                <DarkModeIcon sx={{ color: 'text.primary', fontSize: isMobile ? 20 : 30 }}/>
              ) : (
                <LightModeIcon sx={{ color: 'text.primary', fontSize: isMobile ? 20 : 30 }}/>
              )}
              <Switch 
                checked={mode === 'light'}
                onChange={toggleTheme}
                size={"medium"}
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
            
            {isMobile ? (
              <>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 1,
                }}>
          
                  <IconButton
                    onClick={handleMenu}
                    sx={{ color: 'text.primary', margin: '0px', '&:hover': { color: 'accent' } }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <MobileMenu />
                </Box>
              </>
            ) : (
              <>
                <Avatar 
                  onClick={handleProfile} 
                  sx={{ 
                    bgcolor: 'text.primary', 
                    color: 'primary.main', 
                    cursor: 'pointer',
                    fontFamily: 'Nothing',
                    '&:hover': {filter: 'opacity(75%)'}
                  }}
                >
                  {userPfp}
                </Avatar>
                {user?.role === 'admin' && (
                  <Button 
                    onClick={handleManageUsers}
                    variant='contained' 
                    sx={{
                      backgroundColor: 'crimson',
                      fontFamily: 'Nothing',
                      borderRadius: '50px 10px 10px 50px',
                      padding: '9px',
                      color: 'text.primary',
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
                    borderRadius: '10px 50px 50px 10px',
                    padding: '9px',
                    color: 'text.primary',
                    '&:hover': {
                      fontWeight: 'bold',
                      color: 'white',
                      backgroundColor: 'darkred'
                    }
                  }}
                >
                  Logout
                </Button>
              </>
            )}
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