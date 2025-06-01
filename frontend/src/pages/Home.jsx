import React, { useState } from 'react';
import { useNote } from '../context/NoteContext';
import { Box, Typography, useMediaQuery } from '@mui/material';
import EditNoteModal from '../components/EditNoteModal';
import NoteDetailsModal from '../components/NoteDetailsModal';
import Note from '../components/Note.jsx';
import CompletedNote from '../components/CompletedNote.jsx';
import NewNoteModal from '../components/NewNoteModal.jsx';
import DeleteModal from '../components/DeleteModal';
import PageTransition from '../components/PageTransition.jsx';

const Home = () => {
    const { notes, updateNoteState, getNotes, setAsImportant, deleteNote } = useNote();
    const [selectedNote, setSelectedNote] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);
    const isMobile = useMediaQuery('(max-width:420px)');

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

    const handlemarkAsImportant = async (e, note) => {
        e.stopPropagation();
        try {
            await setAsImportant(note._id, { important: !note.important });
        } catch (error) {
            console.error('Error al marcar como importante:', error);
        }
    }

    const handleOpenDelete = (e, note) => {
        e.stopPropagation();
        setNoteToDelete(note);
        setOpenDeleteModal(true);
    };

    const handleConfirmDelete = async (note) => {
        try {
            await deleteNote(note._id);
            getNotes();
        } catch (error) {
            console.error('Error al eliminar nota:', error);
        }
    };

    return (
        <PageTransition>
        <div className='flex flex-col items-start justify-start w-full min-h-screen px-4 sm:px-10 py-5'>
            <Typography sx={{ 
                fontFamily:'nothing',
                fontSize: isMobile ? '2rem' : '4rem', // Reducido a la mitad en móvil
                color: 'text.primary',
                marginBottom: isMobile ? '10px' : '20px',
                textAlign: 'start',
                borderBottom: '2px solid',
                borderColor: 'accent',
            }}>My Notes <NewNoteModal/> </Typography>
            
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                flexWrap: 'wrap',
                gap: isMobile ? '10px' : '20px', 
                justifyContent: 'start', 
                alignItems: 'start', 
                width: '100%',
                marginBottom: isMobile ? '20px' : '40px'
            }} component='section'> 
                {notes.filter(note => !note.isCompleted).length > 0 ? (
                    notes
                        .filter(note => !note.isCompleted)
                        .sort((a, b) => {
                            // Ordenar primero por important (true primero)
                            if (a.important && !b.important) return -1;
                            if (!a.important && b.important) return 1;
                            // Si tienen el mismo important, ordenar por fecha de creación
                            return new Date(a.dueDate) - new Date(b.dueDate);
                        })
                        .map((note) => (
                            <Note
                                key={note._id}
                                note={note}
                                onToggleComplete={handleToggleComplete}
                                onEdit={handleOpenEdit}
                                onView={handleOpenView}
                                onMarkAsImportant={handlemarkAsImportant}
                                onDelete={handleOpenDelete}
                            />
                        ))
                ) : (
                    <Typography sx={{ 
                        color: 'text.primary', 
                        fontFamily: 'Nothing', 
                        fontSize: isMobile ? '0.75rem' : '1rem',
                        textAlign: 'left',
                        width: '100%'
                    }}>
                        You have no notes created.
                    </Typography>
                )}
            </Box>
                    
            {notes.filter(note => note.isCompleted).length > 0 && (
                <>
                    <Typography sx={{ 
                        fontFamily:'nothing',
                        fontSize: isMobile ? '2rem' : '4rem', // Reducido a la mitad en móvil
                        color: 'text.primary',
                        marginBottom: isMobile ? '10px' : '20px',
                        textAlign: 'start',
                        borderBottom: '2px solid',
                        borderColor: 'accent',
                    }}>Completed</Typography>
                    
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'row', 
                        flexWrap: 'wrap',
                        gap: isMobile ? '10px' : '20px',
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
                                onDelete={handleOpenDelete}
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

            {noteToDelete && (
                <DeleteModal
                    note={noteToDelete}
                    open={openDeleteModal}
                    handleClose={() => setOpenDeleteModal(false)}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
        </PageTransition>
    );
};

export default Home;