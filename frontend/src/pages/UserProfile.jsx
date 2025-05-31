import { Avatar, Box, Button, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import EditProfileModal from '../components/EditProfileModal';
import PageTransition from '../components/PageTransition';

const UserProfile = () => {
    const { userData } = useUser();
    const { user } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:420px)');

    const username = user ? user.user : 'Guest';
    const userPfp = username ? username.charAt(0).toUpperCase() : '?';
    
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleOpenEdit = () => {
        setOpenEditModal(true);
    };

    const handleCloseEdit = () => {
        setOpenEditModal(false);
    };

    return (
        <PageTransition>
            <div className='flex items-center justify-center w-full h-screen'>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: 2, 
                    width: 'fit-content', 
                    height: 'fit-content', 
                    backgroundColor: 'primary.main', 
                    color: 'white', 
                    padding: isMobile ? '10px' : '20px', 
                    borderRadius: '10px'
                }}>
                    <Avatar sx={{ 
                        bgcolor: 'text.primary', 
                        color: 'primary.main', 
                        fontFamily: 'Nothing', 
                        fontSize: isMobile ? '3rem' : '6rem', 
                        width: isMobile ? '75px' : '150px', 
                        height: isMobile ? '75px' : '150px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                    }}>{userPfp}</Avatar>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'start', 
                        justifyContent: 'center', 
                        gap: 1, 
                        width: isMobile ? '100%' : 'fit-content', 
                        height: 'fit-content', 
                        color: 'white' 
                    }}>
                        <div className='flex flex-row gap-1 justify-between items-center w-full'>
                            <Box sx={{ 
                                color: 'text.primary', 
                                padding: isMobile ? '5px' : '10px', 
                                borderRadius: '50px 10px 10px 50px', 
                                backgroundColor: 'primary.light',
                                fontSize: isMobile ? '0.75rem' : '1rem'
                            }}>Username</Box>
                            <Box sx={{ 
                                color: 'text.primary', 
                                padding: isMobile ? '5px' : '10px', 
                                borderRadius: '10px 50px 50px 10px', 
                                backgroundColor: 'primary.light',
                                fontSize: isMobile ? '0.75rem' : '1rem'
                            }}>{userData.username}</Box>
                        </div>
                        <div className='flex flex-row gap-1 justify-between items-center w-full'>
                            <Box sx={{ 
                                color: 'text.primary', 
                                padding: isMobile ? '5px' : '10px', 
                                borderRadius: '50px 10px 10px 50px', 
                                backgroundColor: 'primary.light',
                                fontSize: isMobile ? '0.75rem' : '1rem'
                            }}>Email</Box>
                            <Box sx={{ 
                                color: 'text.primary', 
                                padding: isMobile ? '5px' : '10px', 
                                borderRadius: '10px 50px 50px 10px', 
                                backgroundColor: 'primary.light',
                                fontSize: isMobile ? '0.75rem' : '1rem'
                            }}>{userData.email}</Box>
                        </div>
                        <Button 
                            onClick={handleOpenEdit}
                            variant='contained' 
                            color="text.main"
                            sx={{
                                width: '100%',
                                backgroundColor: 'crimson',
                                fontFamily: 'Nothing',
                                borderRadius: '50px',
                                padding: isMobile ? '5px' : '9px',
                                color: 'text.primary',
                                fontSize: isMobile ? '0.75rem' : '1rem',
                                '&:hover': {
                                    fontWeight: 'bold',
                                    color: 'white',
                                    backgroundColor: 'darkred'
                                }
                            }}
                        >
                            Edit Profile
                        </Button>

                        <EditProfileModal 
                            isOpen={openEditModal}
                            onClose={handleCloseEdit}
                            user={userData}
                        />
                    </Box>
                </Box>
            </div>
        </PageTransition>
    )
}

export default UserProfile