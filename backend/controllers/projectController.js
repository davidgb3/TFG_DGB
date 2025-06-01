import mongoose from 'mongoose';
import Note from "../models/Note.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

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
        // Obtener el usuario actual
        const currentUser = await User.findById(req.userId);
        if (!currentUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        let projects;
        
        // Si es admin, puede ver todos los proyectos
        if (currentUser.role === 'admin') {
            projects = await Project.find();
        } else {
            // Si no es admin, solo ve los proyectos donde:
            // 1. Es el creador (userId)
            // 2. Está en allowed_users
            projects = await Project.find({
                $or: [
                    { userId: req.userId },
                    { allowed_users: currentUser.username }
                ]
            });
        }

        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: "Error fetching projects" });
    }
};

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

const shareProject = async (req, res) => {
    const { projectId, userId } = req.body;

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }
        if (project.allowed_users.includes(userId)) {
            return res.status(400).json({ message: "El usuario ya tiene acceso a este proyecto" });
        }
        project.allowed_users.push(userId);
        await project.save();
        res.status(200).json({ message: "Proyecto compartido exitosamente" });
    } catch (error) {
        console.error('Error sharing project:', error);
        res.status(500).json({ message: "Error sharing project" });
    }
}

const editProject = async (req, res) => {
    const { id } = req.params;
    const { name, description, allowed_users } = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { name, description, allowed_users },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }

        res.status(200).json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: "Error updating project" });
    }
};

const aviableUsers = async (req, res) => {
    try {
        const { projectId } = req.params;
        const currentUser = req.userId;

        // Verificar si el projectId es válido
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ message: "ID de proyecto inválido" });
        }

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }

        // Obtener el username del usuario actual
        const currentUserDoc = await User.findById(currentUser);
        if (!currentUserDoc) {
            return res.status(404).json({ message: "Usuario actual no encontrado" });
        }

        // Obtener usuarios que:
        // 1. No están en allowed_users
        // 2. No son el usuario actual
        // 3. No son admin
        const users = await User.find({
            $and: [
                { username: { $nin: project.allowed_users || [] } },
                { username: { $ne: currentUserDoc.username } },
                { role: { $ne: 'admin' } }  // Nueva condición para excluir admins
            ]
        }).select('-password');

        res.status(200).json(users);
    } catch (error) {
        console.error('Error en aviableUsers:', error);
        res.status(500).json({ message: "Error fetching available users" });
    }
};

const changeProjectState = async (req, res) => {
    const { id } = req.params;
    const { isActive } = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { isActive },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }

        res.status(200).json(updatedProject);
    } catch (error) {
        console.error('Error updating project state:', error);
        res.status(500).json({ message: "Error updating project state" });
    }
};

const deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }
        res.status(200).json({ message: "Proyecto eliminado exitosamente" });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ message: "Error deleting project" });
    }
};

export { createProject, getProjects, getProjectNotes, shareProject, editProject, aviableUsers, changeProjectState, deleteProject };