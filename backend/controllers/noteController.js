import Note from "../models/Note.js";

const createNote = async (req, res) => {
    const { title, content, dueDate } = req.body;
    const userId = req.userId; // Obtener el ID del usuario autenticado
    try {
        const newNote = new Note({ title, content, userId, dueDate });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la nota" });
    }
};

const getNotesByUser = async (req, res) => {
    const userId = req.userId; // Obtener el ID del usuario autenticado
    try {
        const notes = await Note.find({ userId });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las notas" });
    }
};

const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content, dueDate } = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content, dueDate }, { new: true });
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

export { createNote, getNotesByUser, updateNote, updateNoteState };