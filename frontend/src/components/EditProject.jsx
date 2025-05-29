import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useProject } from '../context/ProjectContext';
import { useUser } from '../context/UserContext';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';

const EditProject = ({ project, open, handleClose }) => {
    const { editProject, error } = useProject();
    const { userList } = useUser();
    
    const [formData, setFormData] = useState({
        name: project?.name || "",
        description: project?.description || "",
        allowed_users: project?.allowed_users || []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejador específico para el select múltiple
    const handleUsersChange = (event) => {
        const {
            target: { value },
        } = event;
        setFormData({
            ...formData,
            allowed_users: typeof value === 'string' ? value.split(',') : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editProject(project._id, formData);
            if(!error) {
                handleClose();
            }
        } catch (error) {
            console.error('Error editing project:', error);
        }
    }

    console.log(formData.allowed_users);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ 
                width: '50%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'primary.main',
                borderRadius: '20px',
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}>
                <Typography variant="h4" sx={{ 
                    color: 'text.primary',
                    fontFamily: 'Nothing',
                    borderBottom: '2px solid',
                    borderColor: 'accent'
                }}>
                    Edit Project
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 2
                }}>
                    <TextField  
                        required
                        type="text" 
                        value={formData.name} 
                        onChange={handleChange} 
                        name="name"  
                        placeholder="Project Name" 
                        label="Project Name" 
                        variant="filled" 
                        sx={{
                            backgroundColor: 'primary.main',
                            borderRadius: '5px',
                            '& .MuiFilledInput-input': { 
                                color: 'accent', 
                                fontFamily: 'Nothing',     
                            },
                            '& .MuiInputLabel-root': {
                                color: 'text.primary',
                                fontFamily: 'Nothing',
                            }
                        }} 
                    />

                    <TextField  
                        required
                        multiline
                        minRows={4}
                        maxRows={8}
                        type="text" 
                        value={formData.description} 
                        onChange={handleChange} 
                        name="description"  
                        placeholder="Project Description" 
                        label="Project Description" 
                        variant="filled" 
                        sx={{
                            backgroundColor: 'primary.main',
                            borderRadius: '5px',
                            '& .MuiFilledInput-input': { 
                                color: 'accent', 
                                fontFamily: 'Nothing',     
                            },
                            '& .MuiInputLabel-root': {
                                color: 'text.primary',
                                fontFamily: 'Nothing',
                            }
                        }} 
                    />

                    <FormControl variant="outlined" sx={{ 
                        backgroundColor: 'primary.main',
                        borderRadius: '5px',
                        '& .MuiOutlinedInput-root': {
                            color: 'accent',
                            fontFamily: 'Nothing',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'text.primary',
                            fontFamily: 'Nothing',
                        }
                    }}>
                        <InputLabel id="allowed-users-label">Allowed Users</InputLabel>
                        <Select
                            labelId="allowed-users-label"
                            id="allowed-users"
                            multiple
                            value={formData.allowed_users}
                            onChange={handleUsersChange}
                            input={<OutlinedInput label="Allowed Users" />}
                            name="allowed_users"
                            sx={{
                                color: 'accent',
                                fontFamily: 'Nothing',
                                '& .MuiSelect-select': {
                                    color: 'accent',
                                }
                            }}
                        >
                            {formData.allowed_users?.map((user) => (
                                <MenuItem 
                                    key={user} 
                                    value={user}
                                    sx={{
                                        fontFamily: 'Nothing',
                                        color: 'text.primary',
                                        '&.Mui-selected': {
                                            backgroundColor: 'primary.light',
                                        },
                                        '&:hover': {
                                            backgroundColor: 'primary.dark',
                                        }
                                    }}
                                >
                                    {user}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button 
                        type="submit"
                        variant="contained"
                        disabled={!formData.name || !formData.description}
                        sx={{
                            backgroundColor: 'crimson',
                            fontFamily: 'Nothing',
                            borderRadius: '50px',
                            color: 'text.main',
                            '&:hover': {
                                backgroundColor: 'darkred',
                                fontWeight: 'bold'
                            }
                        }}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default EditProject