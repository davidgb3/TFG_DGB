import { Box, Button, Modal, Typography } from '@mui/material'
import { useState } from 'react'
import { useProject } from '../context/ProjectContext';
import { useUser } from '../context/UserContext';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';

const InviteUserModal = ({ open, handleClose, projectId }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const { inviteUserToProject, error } = useProject();
    const { userList } = useUser();

    const aviableUsers = userList?.filter(user => !user.allowed_users.includes(user.username));

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedUsers(typeof value === 'string' ? value.split(',') : value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Invitar a múltiples usuarios
            await Promise.all(
                selectedUsers.map(userId => inviteUserToProject(projectId, userId))
            );
            if(!error) {
                handleClose();
                setSelectedUsers([]);
            }
        } catch (error) {
            console.error('Error inviting users:', error);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ 
                width: '400px',
                padding: 3,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'primary.main',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}>
                <Typography variant="h5" sx={{
                    fontFamily: 'Nothing',
                    color: 'text.primary',
                    borderBottom: '2px solid',
                    borderColor: 'accent'
                }}>
                    Invite Users to Project
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}>
                    <FormControl sx={{
                        backgroundColor: 'primary.main',
                        borderRadius: '5px',
                        '& .MuiFilledInput-input': { 
                            color: 'accent',
                            fontFamily: 'Nothing'
                        },
                        '& .MuiInputLabel-root': {
                            color: 'text.primary',
                            fontFamily: 'Nothing'
                        }
                    }}>
                        <InputLabel id="invite-users-label">Select Users</InputLabel>
                        <Select
                            labelId="invite-users-label"
                            multiple
                            value={selectedUsers}
                            onChange={handleChange}
                            input={<OutlinedInput label="Select Users" />}
                            sx={{
                                color: 'accent',
                                fontFamily: 'Nothing',
                            }}
                        >
                            {aviableUsers?.map((user) => (
                                <MenuItem 
                                    key={user._id} 
                                    value={user.username}
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
                                    {user.username} ({user.email})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={selectedUsers.length === 0}
                        sx={{
                            backgroundColor: selectedUsers.length > 0 ? 'crimson' : 'grey',
                            fontFamily: 'Nothing',
                            borderRadius: '50px',
                            color: 'text.main',
                            '&:hover': {
                                backgroundColor: selectedUsers.length > 0 ? 'darkred' : 'grey',
                                fontWeight: 'bold'
                            }
                        }}
                    >
                        Send Invitations
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default InviteUserModal