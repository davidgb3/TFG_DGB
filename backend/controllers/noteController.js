import Note from "../models/Note.js";
import Project from "../models/Project.js";

const createNote = async (req, res) => {
    const { title, content, dueDate, reminderDate, projectId } = req.body;
    const userId = req.userId;
    
    try {
        const newNote = new Note({ 
            title, 
            content, 
            userId, 
            projectId,
            dueDate: dueDate ? new Date(dueDate) : null,
            reminderDate: reminderDate ? new Date(reminderDate) : null
        });

        await newNote.save();

        // Si hay projectId, actualizar el array de notas del proyecto
        if (projectId) {
            await Project.findByIdAndUpdate(
                projectId,
                { $push: { notes: newNote._id } },
                { new: true }
            );
        }

        res.status(201).json(newNote);
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ message: "Error al crear la nota" });
    }
};

const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }
        res.status(200).json({ message: "Nota eliminada" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la nota" });
    }
}

const getNotesByUser = async (req, res) => {
    const userId = req.userId;
    try {
        const notes = await Note.find({ userId });
        const now = new Date();

        const updatedNotes = await Promise.all(notes.map(async (note) => {
            if (note.dueDate && !note.isCompleted) {
                const dueDate = new Date(note.dueDate);
                
                // Comparar año, mes, día, hora y minutos
                const isSameDateTime = 
                    dueDate.getFullYear() === now.getFullYear() &&
                    dueDate.getMonth() === now.getMonth() &&
                    dueDate.getDate() === now.getDate() &&
                    dueDate.getHours() === now.getHours() &&
                    dueDate.getMinutes() === now.getMinutes();

                if (isSameDateTime) {
                    return await Note.findByIdAndUpdate(
                        note._id,
                        { 
                            isCompleted: true,
                            important: true 
                        },
                        { new: true }
                    );
                }
            }
            return note;
        }));

        const sortedNotes = updatedNotes.sort((a, b) => 
            new Date(a.dueDate) - new Date(b.dueDate)
        );

        res.status(200).json(sortedNotes);
    } catch (error) {
        console.error('Error getting notes:', error);
        res.status(500).json({ message: "Error al obtener las notas" });
    }
};

const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content, dueDate, reminderDate } = req.body;
    
    try {
        // Eliminamos el ajuste CEST aquí ya que el modelo ya lo maneja
        const updatedNote = await Note.findByIdAndUpdate(
            id, 
            { 
                title, 
                content, 
                dueDate: dueDate ? new Date(dueDate) : null,
                reminderDate: reminderDate ? new Date(reminderDate) : null
            }, 
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la nota" });
    }
};

const updateNoteState = async (req, res) => {
    const { id } = req.params;
    const { isCompleted } = req.body;
    
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { isCompleted },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ message: "Error al actualizar el estado de la nota" });
    }
};

const markAsImportant = async (req, res) => {
    const { id } = req.params;
    const { important } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { important },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ message: "Error al actualizar la nota" });
    }
};

export { createNote, getNotesByUser, updateNote, updateNoteState, deleteNote, markAsImportant };