import React, { useState } from 'react';
import { useNote } from '../context/NoteContext';
import { Box, Typography } from '@mui/material';
import EditNoteModal from '../components/EditNoteModal';
import NoteDetailsModal from '../components/NoteDetailsModal';
import Note from '../components/Note';
import CompletedNote from '../components/CompletedNote';
import NewNoteModal from '../components/NewNoteModal';
import DeleteModal from '../components/DeleteModal';

const Home = () => {
    const { notes, updateNoteState, getNotes, setAsImportant, deleteNote } = useNote();
    const [selectedNote, setSelectedNote] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);

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

    const handledeleteNote = async (e, note) => {
        e.stopPropagation();
        try {
            await deleteNote(note._id);
            getNotes();
        } catch (error) {
            console.error('Error al eliminar nota:', error);
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
        <div className='flex flex-col items-start justify-start w-full h-screen pl-10 pr-10 pt-5 pb-5'>
            <Typography sx={{ 
                fontFamily:'nothing',
                fontSize: '4rem',
                color: 'text.primary',
                marginBottom: '20px',
                textAlign: 'start',
                borderBottom: '2px solid',
                borderColor: 'accent',
            }}>My Notes <NewNoteModal/> </Typography>
            
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
                {notes
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
                }
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
    );
};

export default Home;