import { Box, Button, Modal, TextField, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import ModalTransition from './ModalTransitions';

const EditProfileModal = ({ isOpen, onClose, user }) => {
    const isMobile = useMediaQuery('(max-width:420px)');
    const { editUserData } = useUser();

    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editUserData(user.id, formData);
        window.location.reload();
    }

    return(
        <ModalTransition isOpen={isOpen} onClose={onClose}>
            <Box sx={{ 
                width: isMobile ? '90%' : '50%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'primary.main',
                borderRadius: '20px',
                padding: isMobile ? 2 : 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}>
                <Typography variant="h4" sx={{ 
                    color: 'text.primary',
                    fontFamily: 'Nothing',
                    borderBottom: '2px solid',
                    borderColor: 'accent',
                    fontSize: isMobile ? '1.5rem' : '2.125rem'
                }}>
                    Edit Profile
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 2
                }}>
                    <TextField  
                        type="text" 
                        value={formData.username} 
                        onChange={handleChange} 
                        name="username"  
                        placeholder="Username" 
                        label="Username" 
                        variant="filled" 
                        sx={{
                            backgroundColor: 'primary.main',
                            borderRadius: '5px',
                            '& .MuiFilledInput-input': { 
                                color: 'accent', 
                                fontFamily: 'Nothing',
                                fontSize: isMobile ? '0.875rem' : '1rem'     
                            },
                            '& .MuiInputLabel-root': {
                                color: 'text.primary',
                                fontFamily: 'Nothing',
                                fontSize: isMobile ? '0.875rem' : '1rem'
                            }
                        }} 
                    />
                    <TextField 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        name="email"  
                        placeholder="Email" 
                        label="Email" 
                        variant="filled" 
                        sx={{
                            backgroundColor: 'primary.main',
                            borderRadius: '5px',
                            '& .MuiFilledInput-input': { 
                                color: 'accent', 
                                fontFamily: 'Nothing',
                                fontSize: isMobile ? '0.875rem' : '1rem'     
                            },
                            '& .MuiInputLabel-root': {
                                color: 'text.primary',
                                fontFamily: 'Nothing',
                                fontSize: isMobile ? '0.875rem' : '1rem'
                            }
                        }} 
                    />

                    <TextField  
                        type="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        name="password"  
                        placeholder="Passwrord" 
                        label="Password * (Optional) " 
                        variant="filled" 
                        sx={{
                            backgroundColor: 'primary.main',
                            borderRadius: '5px',
                            '& .MuiFilledInput-input': { 
                                color: 'accent', 
                                fontFamily: 'Nothing',
                                fontSize: isMobile ? '0.875rem' : '1rem'     
                            },
                            '& .MuiInputLabel-root': {
                                color: 'text.primary',
                                fontFamily: 'Nothing',
                                fontSize: isMobile ? '0.875rem' : '1rem'
                            }
                        }} 
                    />
                    <Button 
                        disabled={!formData.username && !formData.email}
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: 'crimson',
                            fontFamily: 'Nothing',
                            borderRadius: '50px',
                            padding: '9px',
                            color: 'text.main',
                            fontSize: isMobile ? '0.875rem' : '1rem',
                            '&:hover': {
                                fontWeight: 'bold',
                                color: 'white',
                                backgroundColor: 'darkred'
                            }
                        }}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Box>
        </ModalTransition>
    );
};

export default EditProfileModal;