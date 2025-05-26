import { Box, Typography } from "@mui/material";
import NewProjectModal from "../components/NewProjectModal";
import { useProject } from "../context/ProjectContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ShareIcon from '@mui/icons-material/Share';
import { useState } from "react";
import InviteUserModal from "../components/InviteUserModal";
import { useUser } from "../context/UserContext";
import EditIcon from '@mui/icons-material/Edit';
import EditProject from '../components/EditProject';

const Projects = () => {

    const { projects } = useProject();
    const { user } = useAuth();
    const { getUserList } = useUser();
    
    const navigate = useNavigate();

    const [openInviteModal, setOpenInviteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleProjectNotes = (projectId) => {
        navigate(`/project/${projectId}`);	
    };

    const handleOpenInviteModal = (e, projectId) => {
        e.stopPropagation(); // Evita que se abra el proyecto
        setSelectedProject(projectId);
        handleGetUserList(projectId); // Obtiene la lista de usuarios
        setOpenInviteModal(true);
    };

    const handleCloseInviteModal = () => {
        setOpenInviteModal(false);
        setSelectedProject(null);
    };

    const handleGetUserList = (projectId) => {
        getUserList(projectId);
    }

    const handleOpenEdit = (e, project) => {
        e.stopPropagation();
        setSelectedProject(project);
        setOpenEditModal(true);
    };

    const handleCloseEdit = () => {
        setOpenEditModal(false);
        setSelectedProject(null);
    };

    return (
        <div className='flex flex-col items-start justify-start w-full h-screen pl-10 pr-10 pt-5 pb-5'>
            <Typography sx={{ 
                fontFamily:'nothing',
                fontSize: '4rem',
                color: 'text.primary',
                marginBottom: '20px',
                textAlign: 'start',
                borderBottom: '2px solid',
                borderColor: 'accent',
            }}>Projects {user?.role === 'admin' && <NewProjectModal/>} </Typography>
            <Box >
                {projects?.map((project) => (
                    <Box 
                        onClick={() => handleProjectNotes(project._id)}
                        key={project._id}
                        component='div' 
                        sx={{ 
                            width: 'auto', 
                            minWidth: '250px', 
                            maxWidth: '1000px',
                            height: 'fit-content',
                            minHeight: 'fit-content',
                            position: 'relative',
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'center',
                            alignItems: 'start',
                            gap: 1, 
                            padding: 2, 
                            backgroundColor: 'primary.main', 
                            borderRadius: '10px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                backgroundColor: 'primary.light',
                            }
                        }}
                    >   
                        <Box sx={{ 
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 'fit-content',
                            height: 'fit-content',
                            gap: 1
                        }}>
                            <EditIcon 
                                onClick={(e) => handleOpenEdit(e, project)}
                                sx={{
                                    color: 'text.primary',
                                    transition: 'all 0.3s ease',
                                    fontSize: '2rem',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: 'accent',
                                        transform: 'scale(1.1)'
                                    }
                                }}
                            />
                            <ShareIcon 
                                onClick={(e) => {handleOpenInviteModal(e, project._id)}}
                                sx={{
                                    color: 'text.primary',
                                    transition: 'all 0.3s ease',
                                    fontSize: '2rem',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: 'accent',
                                        transform: 'scale(1.1)'
                                    }
                                }}
                            />
                        </Box>
                        <Typography variant="h2" 
                            sx={{ 
                            fontFamily: 'Nothing',
                            fontSize: '2.25rem',
                            width: 'auto',
                            maxWidth: 'calc(100% - 40px)', // Espacio para los iconos
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            wordBreak: 'break-word',
                            paddingRight: '50px',
                            color: 'text.primary',
                            marginRight: '40px' // Espacio fijo para los iconos
                        }}>{project.name}</Typography>

                        <Typography variant="h2" 
                            sx={{ 
                                fontFamily: 'Nothing',
                                fontSize: '1rem',
                                width: 'auto',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                wordBreak: 'break-word',
                                paddingRight: '50px',
                                color: 'text.primary',
                            }}>{project.description}</Typography>
                    </Box>
                ))}
            </Box>
            {selectedProject && (
                <InviteUserModal
                    open={openInviteModal}
                    handleClose={handleCloseInviteModal}
                    projectId={selectedProject}
                />
            )}
            {selectedProject && (
                <EditProject
                    project={selectedProject}
                    open={openEditModal}
                    handleClose={handleCloseEdit}
                />
            )}
        </div>
    );
}

export default Projects;