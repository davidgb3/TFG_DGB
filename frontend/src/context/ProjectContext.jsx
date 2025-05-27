import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({children}) => {
    const VITE_BASE_DB_URL = import.meta.env.VITE_BASE_DB_URL || 'http://localhost:3000/api/'

    const [projects, setProjects] = useState([]);
    const [projectNotes, setProjectNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [project, setProject] = useState(null);

    useEffect(() => {
        getProjects();
    }, []);

    const newProject = async(formData) => {
        const { name, description } = {...formData};

        try {
            const response = await fetch(`${VITE_BASE_DB_URL}projects/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ name, description }),
            });
            if (!response.ok) {
                return;
            }
        }catch {
            return;
        }
    };

    const getProjects = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${VITE_BASE_DB_URL}projects/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) {
                setError('Error fetching projects');
                return;
            }
            const data = await response.json();
            setProjects(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getProjectNotes = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${VITE_BASE_DB_URL}projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            
            if (!response.ok) {
                throw new Error('Error fetching project notes');
            }
            
            const data = await response.json();
            setProjectNotes(data);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const inviteUserToProject = async (projectId, userId) => {
        setLoading(true);
        try {
            const response = await fetch(`${VITE_BASE_DB_URL}projects/invite_users`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ projectId, userId }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message);
                return;
            }

            // Si todo va bien, actualizamos la lista de proyectos
            getProjects();
            setError(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const editProject = async (id, formData) => {
        const { name, description, allowed_users } = {...formData};

        try {
            const response = await fetch(`${VITE_BASE_DB_URL}projects/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ name, description, allowed_users }),
            });
            if (!response.ok) {
                setError('Error updating project');
                return;
            }
            getProjects();
        } catch (error) {
            setError(error.message);
        }
    }

     const getAviableUsers = async (projectId) => {
        setLoading(true);
        try {
            const response = await fetch(`${VITE_BASE_DB_URL}projects/available_users/${projectId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                console.error('Error response:', await response.text());
                throw new Error('Error fetching available users');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching available users:', error);
            setError(error.message);
            return [];
        } finally {
            setLoading(false);
        }
    }

    return (
        <ProjectContext.Provider value={{ 
            newProject, 
            projects, 
            loading, 
            setLoading, 
            error, 
            setError, 
            getProjectNotes, 
            projectNotes, 
            inviteUserToProject, 
            editProject,
            project,
            setProject,
            getAviableUsers,
        }}>
            {children}
        </ProjectContext.Provider>
    )
}

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProject must be used within a ProjectProvider");
    }
    return context;
}