import React, { useState } from 'react';
import { useNote } from '../context/NoteContext';
import { Box, Typography } from '@mui/material';
import EditNoteModal from '../components/EditNoteModal';
import NoteDetailsModal from '../components/NoteDetailsModal';
import Note from '../components/Note';
import CompletedNote from '../components/CompletedNote';

const Home = () => {
    const { notes, updateNoteState, getNotes } = useNote();
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
            await updateNoteState(note._id, { isCompleted: !note.isCompleted });
        } catch (error) {
            console.error('Error al cambiar estado:', error);
        }
    };

    return (
        <div className='flex flex-col items-start justify-start w-full h-screen pl-10 pr-10 pt-5 pb-5'>
            <Typography sx={{ 
                fontFamily:'nothing',
                fontSize: '4rem',
                color: 'text.primary',
                marginBottom: '20px',
                textAlign: 'start',
                borderBottom: '2px solid',
                borderColor: 'accent',
            }}>My Notes</Typography>
            
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                flexWrap: 'wrap',
                gap: '20px', 
                justifyContent: 'start', 
                alignItems: 'start', 
                width: '100%',
                marginBottom: '40px'
            }} component='section'> 
                {notes.filter(note => !note.isCompleted).map((note) => (
                    <Note
                        key={note._id}
                        note={note}
                        onToggleComplete={handleToggleComplete}
                        onEdit={handleOpenEdit}
                        onView={handleOpenView}
                    />
                ))}
            </Box>
                    
            {notes.filter(note => note.isCompleted).length > 0 && (
                <>
                    <Typography sx={{ 
                        fontFamily:'nothing',
                        fontSize: '4rem',
                        color: 'text.primary',
                        marginBottom: '20px',
                        textAlign: 'start',
                        borderBottom: '2px solid',
                        borderColor: 'accent',
                    }}>Completed</Typography>
                    
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'row', 
                        flexWrap: 'wrap',
                        gap: '20px', 
                        justifyContent: 'start', 
                        alignItems: 'start', 
                        width: '100%'
                    }} component='section'>
                        {notes.filter(note => note.isCompleted).map((note) => (
                            <CompletedNote
                                key={note._id}
                                note={note}
                                onRestore={handleToggleComplete}
                                onEdit={handleOpenEdit}
                                onView={handleOpenView}
                            />
                        ))}
                    </Box>
                </>
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