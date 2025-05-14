import Note from "../models/Note.js";

const createNote = async (req, res) => {
    const { title, content, dueDate, reminderDate } = req.body;
    const userId = req.userId;
    
    try {
        // Ajustar a CEST (UTC+2)
        const cestOffset = 2 * 60 * 60 * 1000; // 2 horas en milisegundos
        let adjustedDueDate = dueDate ? new Date(new Date(dueDate).getTime() + cestOffset) : null;
        let adjustedReminderDate = reminderDate ? new Date(new Date(reminderDate).getTime() + cestOffset) : null;

        const newNote = new Note({ 
            title, 
            content, 
            userId, 
            dueDate: adjustedDueDate,
            ...(reminderDate && { reminderDate: adjustedReminderDate })
        });

        await newNote.save();
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
        // Obtener todas las notas del usuario
        const notes = await Note.find({ userId });
        
        // Obtener la fecha actual en CEST
        const cestOffset = 2 * 60 * 60 * 1000; // 2 horas en milisegundos
        const today = new Date(new Date().getTime() + cestOffset);

        // Verificar y actualizar notas vencidas
        const updatedNotes = await Promise.all(notes.map(async (note) => {
            if (note.dueDate && new Date(note.dueDate) < today && !note.isCompleted) {
                // Actualizar la nota a completada si está vencida
                return await Note.findByIdAndUpdate(
                    note._id,
                    { isCompleted: true },
                    { new: true }
                );
            }
            return note;
        }));

        // Ordenar por fecha de vencimiento
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
        // Ajustar a CEST (UTC+2)
        const cestOffset = 2 * 60 * 60 * 1000; // 2 horas en milisegundos
        let adjustedDueDate = dueDate ? new Date(new Date(dueDate).getTime()) : null;
        let adjustedReminderDate = reminderDate ? new Date(new Date(reminderDate).getTime()) : null;

        const updatedNote = await Note.findByIdAndUpdate(
            id, 
            { 
                title, 
                content, 
                dueDate: adjustedDueDate,
                reminderDate: adjustedReminderDate 
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