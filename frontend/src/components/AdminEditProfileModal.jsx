import { Box, Button, Modal, TextField, Typography, Select, MenuItem, InputLabel, FormControl, OutlinedInput, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useAdmin } from "../context/AdminContext";

const AdminEditProfileModal = ({ isOpen, onClose, user }) => {
    const isMobile = useMediaQuery('(max-width:420px)');
    const { modifyUserData } = useAdmin();

    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
        role: user.role || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        modifyUserData(user._id, formData);
        window.location.reload();
    }

    return(
        <Modal 
            open={isOpen} 
            onClose={onClose}
        >
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

                    <FormControl variant="outlined" sx={{ width: '100%' }}>
                        <InputLabel 
                            id="role-select-label"
                            sx={{
                                color: 'text.primary',
                                fontFamily: 'Nothing',
                                fontSize: isMobile ? '0.875rem' : '1rem',
                                '&.Mui-focused': {
                                    color: 'accent'
                                }
                            }}
                        >
                            Role
                        </InputLabel>
                        <Select
                            labelId="role-select-label"
                            value={formData.role}
                            onChange={handleChange}
                            input={<OutlinedInput label="Role" />}
                            name="role"
                            sx={{
                                backgroundColor: 'primary.main',
                                borderRadius: '5px',
                                '& .MuiSelect-select': { 
                                    color: 'accent',
                                    fontFamily: 'Nothing',
                                    fontSize: isMobile ? '0.875rem' : '1rem'
                                },
                                '& .MuiSelect-icon': {
                                    color: 'text.primary'
                                },
                                '&:hover': {
                                    '&& fieldset': {
                                        borderColor: 'accent'
                                    }
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'accent'
                                }
                            }}
                        >
                            <MenuItem 
                                value="admin"
                                sx={{ 
                                    fontFamily: 'Nothing',
                                    fontSize: isMobile ? '0.875rem' : '1rem',
                                    '&:hover': {
                                        backgroundColor: 'primary.light'
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: 'primary.main',
                                        '&:hover': {
                                            backgroundColor: 'primary.light'
                                        }
                                    }
                                }}
                            >
                                Admin
                            </MenuItem>
                            <MenuItem 
                                value="user"
                                sx={{ 
                                    fontFamily: 'Nothing',
                                    fontSize: isMobile ? '0.875rem' : '1rem',
                                    '&:hover': {
                                        backgroundColor: 'primary.light'
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: 'primary.main',
                                        '&:hover': {
                                            backgroundColor: 'primary.light'
                                        }
                                    }
                                }}
                            >
                                User
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <Button 
                        disabled={!formData.username && !formData.email}
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: 'crimson',
                            fontFamily: 'Nothing',
                            fontSize: isMobile ? '0.875rem' : '1rem',
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
                        Save Changes
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AdminEditProfileModal;