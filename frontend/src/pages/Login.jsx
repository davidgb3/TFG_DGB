import React from 'react'
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Box, Button, Typography } from '@mui/material';
import PageTransition from '../components/PageTransition.jsx';

const Login = () => {
  const { login, error, loading, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  // Redireccionar si ya está autenticado
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    try {
      await login(username, password);
      setTimeout(() => {
        navigate('/', { replace: true });
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Error durante el login:", error);
    }
  }

  return (
    <PageTransition>
    <div className='flex flex-col items-center justify-center min-h-screen px-4'>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: 'fit-content', 
        backgroundColor: 'primary.main', 
        margin: '5px', 
        borderRadius: '20px', 
        padding: {
          xs: '15px',  // padding más pequeño en móviles
          sm: '20px'
        }, 
        width: {
          xs: '100%',  // ancho completo en móviles
          sm: '400px'
        },
        maxWidth: '400px'  // máximo ancho para todos los dispositivos
      }}>
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 'bold',
            fontSize: {
              xs: '2rem',    // tamaño más pequeño en móviles
              sm: '2.25rem'
            },
            marginBottom: 2,
            color: 'text.primary',
            fontFamily: 'Nothing',
          }}
        >
          Login
        </Typography>
        {error && <Typography variant="body1" sx={{ color: 'red', fontFamily: 'Nothing' }}>{error}**</Typography>}
        {loading && <Typography variant="body1" sx={{ color: 'text.primary', fontFamily: 'Nothing' }}>Loading...</Typography>}
          <form method="post" onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-1 w-full'>
            <div className='flex flex-col sm:flex-row w-full gap-2 mb-4'>
              <TextField 
                required 
                type="text" 
                value={formData.username} 
                onChange={handleChange} 
                name="username"  
                placeholder="Username" 
                label="Username" 
                variant="filled" 
                fullWidth
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
                }}/>
              <TextField 
                required 
                type="password" 
                value={formData.password} 
                onChange={handleChange} 
                name="password"  
                placeholder="Password" 
                label="Password" 
                variant="filled" 
                fullWidth
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
                }}/>
            </div>
            <Button 
              variant='contained' 
              fullWidth 
              sx={{
                backgroundColor: 'accent', 
                fontFamily: 'Nothing', 
                borderRadius: '50px',
                padding: {
                  xs: '8px 16px',  // padding más pequeño en móviles
                  sm: '10px 20px'
                },
                '&:hover': {
                  fontWeight: 'bold', 
                  backgroundColor: 'darkred'
                }
              }} 
              type="submit" 
            >
              Login
            </Button>
          </form>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.primary', 
              fontFamily: 'Nothing', 
              marginTop: 2,
              fontSize: {
                xs: '0.9rem',  // tamaño más pequeño en móviles
                sm: '1rem'
              },
              "&:hover": {
                color: 'accent'
              }, 
              transition: 'all 0.5s' 
            }} 
            onClick={() => navigate('/register')} 
            className='cursor-pointer'
          >
            Don't have an account? Register
          </Typography>
        </Box>
      </div>
      </PageTransition>
  )
}

export default Login