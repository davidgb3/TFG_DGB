import React from 'react'
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import PageTransition from '../components/PageTransition';


const Register = () => {
  const { resgister, error, loading, isAuthenticated } = useAuth();
  const isMobile = useMediaQuery('(max-width:420px)');

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    try {
      await resgister(username, email, password);
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 200);
    } catch (error) {
      console.error("Error durante el registro:", error);
    }
  }

  // Redireccionar si ya está autenticado
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <PageTransition>
      <div className='flex flex-col items-center justify-center h-screen'>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: 'fit-content', 
          backgroundColor: 'primary.main', 
          margin: '5px', 
          borderRadius: '20px', 
          padding: '20px', 
          width: isMobile ? '90%' : '400px' 
        }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 'bold',
              fontSize: isMobile ? '1.125rem' : '2.25rem',
              marginBottom: 2,
              color: 'text.primary',
              fontFamily: 'Nothing',
            }}
          >
            Register
          </Typography>
          {error && (
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'red', 
                fontFamily: 'Nothing',
                fontSize: isMobile ? '0.875rem' : '1rem' 
              }}
            >
              {error}**
            </Typography>
          )}
          {loading && (
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.primary', 
                fontFamily: 'Nothing',
                fontSize: isMobile ? '0.875rem' : '1rem'
              }}
            >
              Loading...
            </Typography>
          )}
          <form method="post" onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-1'>
            <div className='flex flex-col gap-2 mb-4'>
              <TextField 
                required 
                type="text" 
                value={formData.username} 
                onChange={handleChange} 
                name="username"  
                placeholder="Username" 
                label="Username" 
                variant="filled" 
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'text.primary',
                    borderRadius: '5px',
                    '& .MuiFilledInput-input': { 
                      color: 'accent', 
                      fontFamily: 'Nothing',     
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&:hover fieldset': {
                        borderColor: 'accent',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'accent',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'text.primary',
                      fontFamily: 'Nothing',
                      '&.Mui-focused': {
                        color: 'accent'
                      }
                    },
                    '& .MuiOutlinedInput-input': {
                      color: 'primary.main',
                    }
                  }}
              />
              <TextField 
                required 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                name="email"  
                placeholder="Email" 
                label="Email" 
                variant="filled" 
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'text.primary',
                    borderRadius: '5px',
                    '& .MuiFilledInput-input': { 
                      color: 'accent', 
                      fontFamily: 'Nothing',     
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&:hover fieldset': {
                        borderColor: 'accent',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'accent',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'text.primary',
                      fontFamily: 'Nothing',
                      '&.Mui-focused': {
                        color: 'accent'
                      }
                    },
                    '& .MuiOutlinedInput-input': {
                      color: 'primary.main',
                    }
                  }}
              />

              <TextField 
                required 
                type="password" 
                value={formData.password} 
                onChange={handleChange} 
                name="password"  
                placeholder="Password" 
                label="Password" 
                variant="filled" 
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'text.primary',
                    borderRadius: '5px',
                    '& .MuiFilledInput-input': { 
                      color: 'accent', 
                      fontFamily: 'Nothing',     
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&:hover fieldset': {
                        borderColor: 'accent',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'accent',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'text.primary',
                      fontFamily: 'Nothing',
                      '&.Mui-focused': {
                        color: 'accent'
                      }
                    },
                    '& .MuiOutlinedInput-input': {
                      color: 'primary.main',
                    }
                  }}
              />
            </div>
            <Button 
              variant='contained' 
              fullWidth 
              sx={{
                backgroundColor: 'accent', 
                fontFamily: 'Nothing',
                fontSize: isMobile ? '0.875rem' : '1rem',
                borderRadius:'50px', 
                '&:hover': {
                  fontWeight: 'bold', 
                  backgroundColor: 'darkred'
                }
              }} 
              type="submit" 
            >
              Register
            </Button>
          </form>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.primary', 
              fontFamily: 'Nothing', 
              marginTop: 2,
              fontSize: isMobile ? '0.875rem' : '1rem',
              textAlign: 'center',
              "&:hover": {
                color: 'accent'
              }, 
              transition: 'all 0.5s' 
            }} 
            onClick={() => navigate('/login')} 
            className='cursor-pointer'
          >
            Have an account? Log In
          </Typography>
        </Box>
      </div>
    </PageTransition>
  )
}

export default Register