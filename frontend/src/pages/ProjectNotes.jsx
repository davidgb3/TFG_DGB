import { useParams } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { Box, Typography, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import Note from '../components/Note';
import EditNoteModal from '../components/EditNoteModal';
import NoteDetailsModal from '../components/NoteDetailsModal';
import { useNote } from '../context/NoteContext';
import CompletedNote from '../components/CompletedNote';
import NewNoteModal from '../components/NewNoteModal';
import DeleteModal from '../components/DeleteModal';

const ProjectNotes = () => {
  const { id } = useParams();
  const { projects, getProjectNotes, projectNotes, loading } = useProject();
  const { updateNoteState, setAsImportant, deleteNote } = useNote();
  const [selectedNote, setSelectedNote] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [error, setError] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const currentProject = projects?.find(project => project._id === id);

  useEffect(() => {
    if (id) {
      getProjectNotes(id);
    }
  }, [id]);

  // Manejadores de eventos para las notas
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
      // Añadir mensaje de retroalimentación
      setNotificationMessage(
        note.isCompleted ? 
        "Note marked as active" : 
        "Note marked as completed"
      );
      // Recargar las notas del proyecto después de actualizar
      getProjectNotes(id);
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      setError('Failed to update note status');
    }
  };

  const handleMarkAsImportant = async (e, note) => {
    e.stopPropagation();
    try {
      await setAsImportant(note._id, { important: !note.important });
      // Recargar las notas del proyecto después de actualizar
      getProjectNotes(id);
    } catch (error) {
      console.error('Error al marcar como importante:', error);
    }
  };

  const handleOpenDelete = (e, note) => {
    e.stopPropagation();
    setNoteToDelete(note);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async (note) => {
    try {
      await deleteNote(note._id);
      getProjectNotes(id); // Recargar las notas del proyecto
      setNotificationMessage("Note deleted successfully");
    } catch (error) {
      console.error('Error al eliminar nota:', error);
      setError('Failed to delete note');
    }
  };

  // Separar las notas en completadas y no completadas
  const activeNotes = projectNotes?.filter(note => !note.isCompleted) || [];
  const completedNotes = projectNotes?.filter(note => note.isCompleted) || [];

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className='flex flex-col items-start justify-start w-full min-h-screen pl-10 pr-10 pt-5 pb-5'>
      <Typography sx={{ 
        fontFamily:'nothing',
        fontSize: '4rem',
        color: 'text.primary',
        marginBottom: '20px',
        textAlign: 'start',
        borderBottom: '2px solid',
        borderColor: 'accent',
      }}>
        {currentProject?.name} <NewNoteModal />
      </Typography>

      <Box sx={{ 
        width: '100%',
        marginBottom: '0.5rem'
      }}>
        <Typography variant="h5" sx={{ 
          color: 'text.primary',
          fontFamily: 'Nothing',
        }}>
          Description: {currentProject?.description}
        </Typography>
      </Box>

      <Divider sx={{ 
        width: '100%', 
        borderColor: 'accent',
        opacity: 0.5,
        my: 3 
      }}/>

      {/* Notas Activas */}
      <Typography variant="h4" sx={{ 
        color: 'text.primary',
        fontFamily: 'Nothing',
        marginBottom: '1rem',
        borderBottom: '2px solid',
        borderColor: 'accent',
      }}>
        Active Notes
      </Typography>
      <Box sx={{ 
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'start',
        alignItems: 'start',
        marginBottom: '2rem'
      }}>
        {activeNotes.length > 0 ? (
          activeNotes
            .sort((a, b) => {
              if (a.important && !b.important) return -1;
              if (!a.important && b.important) return 1;
              return new Date(a.dueDate) - new Date(b.dueDate);
            })
            .map((note) => (
              <Box>
                <Note
                key={note._id}
                note={note}
                onToggleComplete={handleToggleComplete}
                onEdit={handleOpenEdit}
                onView={handleOpenView}
                onMarkAsImportant={handleMarkAsImportant}
                onDelete={handleOpenDelete}
                createdBy={note.username}
              /> 
              </Box>
            ))
        ) : (
          <Typography sx={{ color: 'text.primary', fontFamily: 'Nothing' }}>
            No active notes
          </Typography>
        )}
      </Box>

      {/* Divider y Notas Completadas - solo se muestran si hay notas completadas */}
      {completedNotes.length > 0 && (
        <>
          <Divider sx={{ 
            width: '100%', 
            borderColor: 'accent',
            opacity: 0.5,
            my: 4 
          }}/>

          <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}>
            <Typography variant="h4" sx={{ 
              color: 'text.primary',
              fontFamily: 'Nothing',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              borderBottom: '2px solid',
              borderColor: 'accent',
              width: 'fit-content',
            }}>
              Completed Notes
            </Typography>

            <Box sx={{ 
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'start',
              alignItems: 'start',
            }}>
              {completedNotes
                .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
                .map((note) => (
                  <CompletedNote
                    key={note._id}
                    note={note}
                    onRestore={handleToggleComplete}
                    onEdit={handleOpenEdit}
                    onView={handleOpenView}
                    onDelete={handleOpenDelete}
                    createdBy={note.username}
                  />
                ))}
            </Box>
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

export default ProjectNotes;