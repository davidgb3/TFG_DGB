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
    const { projectId } = req.params;

    try {
        const project = await Project.findById(projectId).populate('notes');
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project.notes);
    }
    catch (error) {
        console.error('Error fetching project notes:', error);
        res.status(500).json({ message: "Error fetching project notes" });
    }
}

export { createProject, getProjects, getProjectNotes };