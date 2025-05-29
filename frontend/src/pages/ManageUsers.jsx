import { useState, useEffect } from 'react';
import { 
    Box, 
    Typography, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    Button,
    Select,
    MenuItem,
    TextField,
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import AdminEditProfileModal from '../components/AdminEditProfileModal';

const ManageUsers = () => {
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({
        username: '',
        email: '',
        role: ''
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { editUserData, error, userList } = useUser();

    console.log(userList);

    const handleOpenEditModal = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setSelectedUser(null);
        setIsEditModalOpen(false);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography 
                variant="h4" 
                sx={{ 
                    marginBottom: 3,
                    fontFamily: 'Nothing',
                    fontSize: '4rem',
                    color: 'text.primary',
                    borderBottom: '2px solid',
                    borderColor: 'accent'
                }}
            >
                Manage Users
            </Typography>

            <TableContainer component={Paper} sx={{ backgroundColor: 'primary.main' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'text.primary', fontFamily: 'Nothing', fontWeight: "bold" }}>Username</TableCell>
                            <TableCell sx={{ color: 'text.primary', fontFamily: 'Nothing', fontWeight: "bold" }}>Email</TableCell>
                            <TableCell sx={{ color: 'text.primary', fontFamily: 'Nothing', fontWeight: "bold" }}>Role</TableCell>
                            <TableCell sx={{ color: 'text.primary', fontFamily: 'Nothing', fontWeight: "bold" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell sx={{ color: 'text.primary', fontFamily: 'Nothing' }}>
                                    {editingUser === user._id ? (
                                        <TextField
                                            value={editForm.username}
                                            onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                                            variant="standard"
                                            sx={{
                                                '& .MuiInputBase-input': { 
                                                    color: 'accent',
                                                    fontFamily: 'Nothing'
                                                }
                                            }}
                                        />
                                    ) : (
                                        user.username
                                    )}
                                </TableCell>
                                <TableCell sx={{ color: 'text.primary', fontFamily: 'Nothing' }}>
                                    {editingUser === user._id ? (
                                        <TextField
                                            value={editForm.email}
                                            onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                            variant="standard"
                                            sx={{
                                                '& .MuiInputBase-input': { 
                                                    color: 'accent',
                                                    fontFamily: 'Nothing'
                                                }
                                            }}
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </TableCell>
                                <TableCell sx={{ color: 'text.primary', fontFamily: 'Nothing' }}>
                                    {editingUser === user._id ? (
                                        <Select
                                            value={editForm.role}
                                            onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                                            variant="standard"
                                            sx={{
                                                color: 'accent',
                                                fontFamily: 'Nothing',
                                                '& .MuiSelect-select': { color: 'accent' }
                                            }}
                                        >
                                            <MenuItem value="user">User</MenuItem>
                                            <MenuItem value="admin">Admin</MenuItem>
                                        </Select>
                                    ) : (
                                        user.role
                                    )}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <EditIcon 
                                        onClick={() => handleOpenEditModal(user)}
                                        sx={{
                                            color: 'text.primary',
                                            transition: 'all 0.3s ease',
                                            fontSize: '1.5rem',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                color: 'accent',
                                                transform: 'scale(1.1)'
                                            }
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add the modal at the end of the component */}
            {selectedUser && (
                <AdminEditProfileModal
                    isOpen={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    user={selectedUser}
                />
            )}
        </Box>
    );
};

export default ManageUsers;