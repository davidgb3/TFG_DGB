import React, { useState } from 'react';
import { useNote } from '../context/NoteContext';
import { Box, Typography } from '@mui/material';
import EditNoteModal from '../components/EditNoteModal';
import NoteDetailsModal from '../components/NoteDetailsModal';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DoneIcon from '@mui/icons-material/Done';

const Home = () => {
    const { notes, updateNoteState } = useNote();
    const [selectedNote, setSelectedNote] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);

    const handleOpenEdit = (e, note) => {
        e.stopPropagation();
        setSelectedNote(note);
        setOpenEditModal(true);
    };

    const handleOpenView = (note) => {
        setSelectedNote(note);
        setOpenViewModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedNote(null);
    };

    const handleToggleComplete = async (e, note) => {
        e.stopPropagation();
        try {
            await updateNoteState(note._id, !note.isCompleted);
            // Recargar las notas o actualizar el estado local
        } catch (error) {
            console.error('Error al cambiar estado:', error);
        }
    };

    return (
        <div className='flex flex-col items-start justify-start w-full h-screen p-10'>
            {notes.length > 0 ? (
                <Box component='section'>
                    {notes.map((note) => (
                        <Box 
                            component='div' 
                            key={note._id}
                            onClick={() => handleOpenView(note)}
                            sx={{ 
                                position: 'relative',
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: 1, 
                                padding: 2, 
                                backgroundColor: 'primary.main', 
                                borderRadius: '10px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    backgroundColor: 'primary.light'
                                }
                            }}
                        >
                            <Box sx={{ 
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                display: 'flex',
                                gap: 1
                            }}>
                                {!note.isCompleted && (
                                    <DoneIcon 
                                        onClick={(e) => handleToggleComplete(e, note)}
                                        sx={{
                                            color: 'text.primary',
                                            transition: 'all 0.3s ease',
                                            fontSize: '1.8rem',
                                            '&:hover': {
                                                color: 'accent',
                                                transform: 'scale(1.1)'
                                            }
                                        }}
                                    />
                                )}
                                <EditIcon 
                                    onClick={(e) => handleOpenEdit(e, note)}
                                    sx={{
                                        color: 'text.primary',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            color: 'accent',
                                            transform: 'scale(1.1)'
                                        }
                                    }}
                                />
                            </Box>
                            <h2 className='text-4xl'>{note.title}</h2>
                            <p>{note.content}</p>
                            <span className='flex flex-row gap-1'>
                                Due Date: 
                                <Typography sx={{ color: 'accent', fontFamily:'Nothing' }}>
                                    {new Date(note.dueDate).toLocaleDateString()}
                                </Typography>
                            </span>
                        </Box>
                    ))}
                </Box>
            ) : (
                <div className="no-notes">No notes available</div>
            )}

            {selectedNote && (
                <>
                    <EditNoteModal 
                        note={selectedNote}
                        open={openEditModal}
                        handleClose={handleCloseEditModal}
                    />
                    <NoteDetailsModal 
                        note={selectedNote}
                        open={openViewModal}
                        handleClose={() => setOpenViewModal(false)}
                    />
                </>
            )}
        </div>
    );
};

export default Home;