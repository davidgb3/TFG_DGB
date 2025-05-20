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

        // Buscamos todas las notas que tengan este projectId (como string o ObjectId)
        const projectNotes = await Note.find({ 
            $or: [
                { projectId: id }, // Buscar como string
                { projectId: new mongoose.Types.ObjectId(id) } // Buscar como ObjectId
            ]
        }).lean();

        console.log('Project Notes encontradas:', projectNotes);

        res.status(200).json(projectNotes);
    } catch (error) {
        console.error('Error completo:', error);
        res.status(500).json({ 
            message: "Error fetching project notes",
            error: error.message
        });
    }
};

export { createProject, getProjects, getProjectNotes };