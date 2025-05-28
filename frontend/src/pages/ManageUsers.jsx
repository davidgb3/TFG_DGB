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

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({
        username: '',
        email: '',
        role: ''
    });
    const { editUserData, error, userList } = useUser();
    const { user } = useAuth();

    console.log(userList);

    return (
        <Box sx={{ padding: 3 }}>
            <Typography 
                variant="h4" 
                sx={{ 
                    marginBottom: 3,
                    fontFamily: 'Nothing',
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
                            <TableCell sx={{ color: 'text.primary', fontFamily: 'Nothing' }}>Username</TableCell>
                            <TableCell sx={{ color: 'text.primary', fontFamily: 'Nothing' }}>Email</TableCell>
                            <TableCell sx={{ color: 'text.primary', fontFamily: 'Nothing' }}>Role</TableCell>
                            <TableCell sx={{ color: 'text.primary', fontFamily: 'Nothing' }}>Actions</TableCell>
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
                                <TableCell>
                                    {editingUser === user._id ? (
                                        <Box>
                                            <IconButton 
                                                sx={{ color: 'success.main' }}
                                            >
                                                <SaveIcon />
                                            </IconButton>
                                            <IconButton 
                                                sx={{ color: 'error.main' }}
                                            >
                                                <CancelIcon />
                                            </IconButton>
                                        </Box>
                                    ) : (
                                        <IconButton 
                                            disabled={user._id === user?._id}
                                            sx={{ 
                                                color: user._id === user?._id ? 'grey.500' : 'accent',
                                                '&:hover': {
                                                    color: 'accent',
                                                }
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ManageUsers;