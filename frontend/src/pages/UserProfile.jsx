import { Avatar, Box, Button } from '@mui/material'
import React from 'react'
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
    const { userData } = useUser();
    const { user } = useAuth();
    const userPfp = user ? user.charAt(0).toUpperCase() : '?';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2, width: 'fit-content', height: 'fit-content', backgroundColor: 'primary.main', color: 'white', padding: '10px', borderRadius: '10px' }}>
        <Avatar sx={{ 
            bgcolor: 'white', 
            color: 'primary.main', 
            fontFamily: 'Nothing', 
            fontSize: '6rem', 
            width: '150px', 
            height: '150px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
        }}>{userPfp}</Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, width: 'fit-content', height: 'fit-content', color: 'white' }}>
            <div className='flex flex-row gap-1 justify-between items-center'>
              <Box sx={{ padding: '10px', borderRadius: '50px 10px 10px 50px', backgroundColor: 'primary.light' }}>Username:</Box>
              <Box sx={{ padding: '10px', borderRadius: '10px 50px 50px 10px', backgroundColor: 'primary.light' }}>{userData.username}</Box>
            </div>
            <div className='flex flex-row gap-1 justify-between items-center'>
              <Box sx={{ padding: '10px', borderRadius: '50px 10px 10px 50px', backgroundColor: 'primary.light' }}>Email:</Box>
              <Box sx={{ padding: '10px', borderRadius: '10px 50px 50px 10px', backgroundColor: 'primary.light' }}>{userData.email}</Box>
            </div>
            <Button 
              variant='contained' 
              color="text.main"
              sx={{
                width: '100%',
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
              Edit Profile
            </Button>
        </Box>
    </Box>
  )
}

export default UserProfile