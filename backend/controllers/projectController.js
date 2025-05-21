import mongoose from 'mongoose';
import Note from "../models/Note.js";
import Project from "../models/Project.js";

const createProject = async (req, res) => {
    const { name, description } = req.body;
    const userId = req.userId;

    try {
        const newProject = new Project({
            name,
            description,
            userId
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: "Error creating project" });
    }
}

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: "Error fetching projects" });
    }
}

const getProjectNotes = async (req, res) => {
    const { id } = req.params;

    try {
        // Primero obtenemos el proyecto para verificar que existe
        const project = await Project.findById(id);
        
        if (!project) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }

        // Buscamos las notas y poblamos el campo userId con el username del User
        const projectNotes = await Note.find({ 
            $or: [
                { projectId: id },
                { projectId: new mongoose.Types.ObjectId(id) }
            ]
        })
        .populate('userId', 'username') // Poblar el campo userId con solo el username
        .lean();

        // Transformar el resultado para tener el username en un formato más limpio
        const notesWithUsername = projectNotes.map(note => ({
            ...note,
            username: note.userId.username, // Añadir el username directamente en la raíz
            userId: note.userId._id // Mantener solo el ID del usuario
        }));

        res.status(200).json(notesWithUsername);
    } catch (error) {
        console.error('Error completo:', error);
        res.status(500).json({ 
            message: "Error fetching project notes",
            error: error.message
        });
    }
};

export { createProject, getProjects, getProjectNotes };