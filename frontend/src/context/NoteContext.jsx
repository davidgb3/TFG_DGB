import { createContext, useContext, useEffect, useState } from "react";


const NoteContext = createContext();
const VITE_BASE_DB_URL = import.meta.env.VITE_BASE_DB_URL || 'http://localhost:3000/api/'

export const NoteProvider = ({children}) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getNotes();
    }, [notes]);

    const newNote = async(formData) => {
        const { title, content, dueDate, reminderDate, projectId } = {...formData};

        try {
            const response = await fetch(`${VITE_BASE_DB_URL}notes/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ title, content, dueDate, reminderDate, projectId }),
            });
            if (!response.ok) {
                setError('Error creating note');
                return;
            }
        }catch {
            setError('Error creating note');
            return;
        }
    };

    const getNotes = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${VITE_BASE_DB_URL}notes/myNotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) {
                setError('Error fetching notes');
                return;
            }
            const data = await response.json();
            setNotes(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateNote = async (id, updatedData) => {
        const { title, content, dueDate, reminderDate } = {...updatedData};

        try {
            const response = await fetch(`${VITE_BASE_DB_URL}notes/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ title, content, dueDate, reminderDate }),
            });
    
            if (!response.ok) {
                setError('Error updating note');
                return;
            }
    
            getNotes(); // Recargar las notas después de actualizar
        } catch (error) {
            setError(error.message);
        }
    };

    const updateNoteState = async (id, isCompleted) => {
        try {
            const response = await fetch(`${VITE_BASE_DB_URL}notes/updateState/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(isCompleted)
            });

            if (!response.ok) {
                throw new Error('Error updating note state');
            }

            await getNotes(); // Recargar las notas después de actualizar
        } catch (error) {
            console.error('Error in updateNoteState:', error);
            setError(error.message);
        }
    };

    const setAsImportant = async (id, important) => {
        try {
            const response = await fetch(`${VITE_BASE_DB_URL}notes/markAsImportant/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(important)
            });

            if (!response.ok) {
                throw new Error('Error updating note state');
            }

            await getNotes(); // Recargar las notas después de actualizar
        } catch (error) {
            console.error('Error in updateNoteState:', error);
            setError(error.message);
        }
    };

    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${VITE_BASE_DB_URL}notes/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Error deleting note');
            }

            await getNotes(); // Recargar las notas después de eliminar
        } catch (error) {
            console.error('Error in deleteNote:', error);
            setError(error.message);
        }
    };

    return (
        <NoteContext.Provider value={{ 
            newNote, 
            notes, 
            loading, 
            error, 
            setError, 
            getNotes, 
            updateNote, 
            updateNoteState,
            setAsImportant,
            deleteNote,
        }}>
            {children}
        </NoteContext.Provider>
    )
}

export const useNote = () => {
    const context = useContext(NoteContext);
    if(!context) {
        throw new Error("UseAuth must be used within an AuthProvider")
    }
    return context
}