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
    IconButton,
    useMediaQuery  // Añadir este import
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import AdminEditProfileModal from '../components/AdminEditProfileModal';
import PageTransition from '../components/PageTransition';

const ManageUsers = () => {
    const isMobile = useMediaQuery('(max-width:420px)');
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
        <PageTransition>
            <Box sx={{ padding: isMobile ? 1 : 3, display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', height: '100vh', width: '100%' }}>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        marginBottom: 3,
                        fontFamily: 'Nothing',
                        fontSize: isMobile ? '2rem' : '4rem',
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
                                <TableCell sx={{ 
                                    color: 'text.primary', 
                                    fontFamily: 'Nothing', 
                                    fontWeight: "bold",
                                    fontSize: isMobile ? '0.75rem' : '1rem'
                                }}>Username</TableCell>
                                <TableCell sx={{ 
                                    color: 'text.primary', 
                                    fontFamily: 'Nothing', 
                                    fontWeight: "bold",
                                    fontSize: isMobile ? '0.75rem' : '1rem'
                                }}>Email</TableCell>
                                <TableCell sx={{ 
                                    color: 'text.primary', 
                                    fontFamily: 'Nothing', 
                                    fontWeight: "bold",
                                    fontSize: isMobile ? '0.75rem' : '1rem'
                                }}>Role</TableCell>
                                <TableCell sx={{ 
                                    color: 'text.primary', 
                                    fontFamily: 'Nothing', 
                                    fontWeight: "bold",
                                    fontSize: isMobile ? '0.75rem' : '1rem'
                                }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userList.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell sx={{ 
                                        color: 'text.primary', 
                                        fontFamily: 'Nothing',
                                        fontSize: isMobile ? '0.75rem' : '1rem'
                                    }}>
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
                                    <TableCell sx={{ 
                                        color: 'text.primary', 
                                        fontFamily: 'Nothing',
                                        fontSize: isMobile ? '0.75rem' : '1rem'
                                    }}>
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
                                    <TableCell sx={{ 
                                        color: 'text.primary', 
                                        fontFamily: 'Nothing',
                                        fontSize: isMobile ? '0.75rem' : '1rem'
                                    }}>
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
                                                fontSize: isMobile ? '1.2rem' : '1.5rem',
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
        </PageTransition>
    );
};

export default ManageUsers;