import { Avatar, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import EditProfileModal from '../components/EditProfileModal';

const UserProfile = () => {
    const { userData } = useUser();
    const { user } = useAuth();

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
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2, width: 'fit-content', height: 'fit-content', backgroundColor: 'primary.main', color: 'white', padding: '20px', borderRadius: '10px' }}>
            <Avatar sx={{ 
                bgcolor: 'text.primary', 
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
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', gap: 1, width: 'fit-content', height: 'fit-content', color: 'white' }}>
                <div className='flex flex-row gap-1 justify-between items-center'>
                    <Box sx={{ color: 'text.primary', padding: '10px', borderRadius: '50px 10px 10px 50px', backgroundColor: 'primary.light' }}>Username</Box>
                    <Box sx={{ color: 'text.primary', padding: '10px', borderRadius: '10px 50px 50px 10px', backgroundColor: 'primary.light' }}>{userData.username}</Box>
                </div>
                <div className='flex flex-row gap-1 justify-between items-center'>
                    <Box sx={{ color: 'text.primary', padding: '10px', borderRadius: '50px 10px 10px 50px', backgroundColor: 'primary.light' }}>Email</Box>
                    <Box sx={{ color: 'text.primary', padding: '10px', borderRadius: '10px 50px 50px 10px', backgroundColor: 'primary.light' }}>{userData.email}</Box>
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
                        padding: '9px',
                        color: 'text.primary',
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
    )
}

export default UserProfile