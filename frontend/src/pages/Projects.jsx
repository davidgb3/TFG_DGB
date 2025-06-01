import { Box, Typography, useMediaQuery } from "@mui/material";
import NewProjectModal from "../components/NewProjectModal";
import { useProject } from "../context/ProjectContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ShareIcon from '@mui/icons-material/Share';
import { useState } from "react";
import InviteUserModal from "../components/InviteUserModal";
import EditIcon from '@mui/icons-material/Edit';
import EditProject from '../components/EditProject';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearIcon from '@mui/icons-material/Clear';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteProjectModal from '../components/DeleteProjectModal';
import DoneIcon from '@mui/icons-material/Done';
import PageTransition from '../components/PageTransition';

const Projects = () => {
    const isMobile = useMediaQuery('(max-width:420px)');
    const { projects, getAviableUsers, updateProjectState, deleteProject } = useProject();
    const { user } = useAuth();
    
    const navigate = useNavigate();

    const [openInviteModal, setOpenInviteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [userList, setUserList] = useState([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

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

    const handleGetUserList = async (projectId) => {
        try {
            const users = await getAviableUsers(projectId);
            setUserList(users);
        } catch (error) {
            console.error('Error getting user list:', error);
        }
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

    const handleProjectState = async (e, projectId, isActive) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await updateProjectState(projectId, isActive);
            // Opcional: Mostrar un mensaje de éxito
        } catch (error) {
            console.error('Error updating project state:', error);
        }
    }

    const handleOpenDelete = (e, project) => {
        e.stopPropagation();
        setProjectToDelete(project);
        setOpenDeleteModal(true);
    };

    const handleConfirmDelete = async (project) => {
        try {
            await deleteProject(project._id);
            setOpenDeleteModal(false);
            setProjectToDelete(null);
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
        <PageTransition>
            <div className='flex flex-col items-start justify-start w-full h-screen px-4 sm:px-10 py-5'>
                <Typography sx={{ 
                    fontFamily:'nothing',
                    fontSize: isMobile ? '2rem' : '4rem',
                    color: 'text.primary',
                    marginBottom: '20px',
                    textAlign: 'start',
                    borderBottom: '2px solid',
                    borderColor: 'accent',
                }}>
                    Projects {user?.role === 'admin' && <NewProjectModal/>}
                </Typography>
                {projects?.length === 0 ? (
                    <Typography sx={{ 
                        fontFamily: 'nothing',
                        fontSize: isMobile ? '0.5rem' : '1rem',
                        color: 'text.secondary',
                        textAlign: 'left',
                        width: '100%',
                    }}>
                        There are no projects available.
                    </Typography>
                ) : (
                    <>
                        <Box sx={{ marginBottom: '40px', display: 'flex', flexDirection: "row", flexWrap: 'wrap', gap: 2, justifyContent: 'start' }}>
                            {projects?.filter(project => project.isActive)
                            .map((project) => (
                                <Box 
                                    onClick={() => handleProjectNotes(project._id)}
                                    key={project._id}
                                    component='div' 
                                    sx={{ 
                                        width: 'auto', 
                                        minWidth: isMobile ? '200px' : '250px',
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
                                    {user?.role === 'admin' && (
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
                                            <DoneIcon
                                                onClick={(e) => handleProjectState(e, project._id, false)}
                                                sx={{
                                                    color: 'text.primary',
                                                    transition: 'all 0.3s ease',
                                                    fontSize: isMobile ? '1.5rem' : '2rem',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        color: 'accent',
                                                        transform: 'scale(1.1)'
                                                    }
                                                }}
                                            />
                                            <EditIcon 
                                                onClick={(e) => handleOpenEdit(e, project)}
                                                sx={{
                                                    color: 'text.primary',
                                                    transition: 'all 0.3s ease',
                                                    fontSize: isMobile ? '1.5rem' : '2rem',
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
                                                    fontSize: isMobile ? '1.5rem' : '2rem',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        color: 'accent',
                                                        transform: 'scale(1.1)'
                                                    }
                                                }}
                                            />
                                            <DeleteForeverIcon
                                                onClick={(e) => handleOpenDelete(e, project)}
                                                sx={{
                                                    color: 'text.primary',
                                                    transition: 'all 0.3s ease',
                                                    fontSize: isMobile ? '1.5rem' : '2rem',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        color: 'error.main',
                                                        transform: 'scale(1.1)'
                                                    }
                                                }}/>
                                        </Box>
                                    )}
                                    <Typography variant="h2" 
                                        sx={{ 
                                            fontFamily: 'Nothing',
                                            fontSize: isMobile ? '1.125rem' : '2.25rem',
                                            width: 'auto',
                                            maxWidth: 'calc(100% - 120px)', // Espacio para los iconos
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            wordBreak: 'break-word',
                                            paddingRight: '50px',
                                            color: 'text.primary',
                                            marginRight: '120px' // Espacio fijo para los iconos
                                        }}
                                    >
                                        {project.name}
                                    </Typography>

                                    <Typography variant="h2" 
                                        sx={{ 
                                            fontFamily: 'Nothing',
                                            fontSize: isMobile ? '0.875rem' : '1rem',
                                            width: 'auto',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            wordBreak: 'break-word',
                                            paddingRight: '50px',
                                            color: 'text.primary',
                                        }}
                                    >
                                        {project.description}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        {/* Proyectos Desactivados */}
                        {projects?.some(project => !project.isActive) && (
                            <>
                                <Typography sx={{ 
                                    fontFamily:'nothing',
                                    fontSize: isMobile ? '1.5rem' : '3rem',
                                    color: 'text.primary',
                                    marginBottom: '20px',
                                    textAlign: 'start',
                                    borderBottom: '2px solid',
                                    borderColor: 'error.main',
                                }}>
                                    Disabled Projects
                                </Typography>
                                <Box sx={{ 
                                    opacity: 0.7,
                                    filter: 'grayscale(50%)'
                                }}>
                                    {projects?.filter(project => !project.isActive)
                                    .map((project) => (
                                        <Box 
                                            key={project._id}
                                            component='div' 
                                            sx={{ 
                                                width: 'auto', 
                                                minWidth: isMobile ? '200px' : '250px',
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
                                                marginBottom: '10px',
                                                cursor: 'default', // Quitar el cursor pointer
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: 'primary.light',
                                                    transform: 'translateY(-5px)',
                                                }
                                            }}
                                        >   
                                            {user?.role === 'admin' && (
                                                <Box sx={{ 
                                                    position: 'absolute',
                                                    top: '10px',
                                                    right: '10px',
                                                    display: 'flex',
                                                    gap: 1
                                                }}>
                                                    <RestoreFromTrashIcon
                                                        onClick={(e) => handleProjectState(e, project._id, true)}
                                                        sx={{
                                                            color: 'text.primary',
                                                            transition: 'all 0.3s ease',
                                                            fontSize: isMobile ? '1.5rem' : '2rem',
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                color: 'accent',
                                                                transform: 'scale(1.1)'
                                                            }
                                                        }}
                                                    />

                                                    <DeleteForeverIcon
                                                        onClick={(e) => handleOpenDelete(e, project)}
                                                        sx={{
                                                            color: 'text.primary',
                                                            transition: 'all 0.3s ease',
                                                            fontSize: isMobile ? '1.5rem' : '2rem',
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                color: 'error.main',
                                                                transform: 'scale(1.1)'
                                                            }
                                                        }}/>
                                                </Box>
                                            )}
                                            <Typography variant="h2" 
                                                sx={{ 
                                                    fontFamily: 'Nothing',
                                                    fontSize: isMobile ? '1.125rem' : '2.25rem',
                                                    width: 'auto',
                                                    maxWidth: 'calc(100% - 80px)',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                   
                                                    wordBreak: 'break-word',
                                                    paddingRight: '50px',
                                                    color: 'text.primary',
                                                    marginRight: '80px'
                                                }}>
                                                {project.name}
                                            </Typography>
                                            <Typography variant="h2" 
                                                sx={{ 
                                                    fontFamily: 'Nothing',
                                                    fontSize: isMobile ? '0.875rem' : '1rem',
                                                    width: 'auto',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    wordBreak: 'break-word',
                                                    paddingRight: '50px',
                                                    color: 'text.primary',
                                                }}>
                                                {project.description}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </>
                        )}
                        
                        {selectedProject && (
                            <InviteUserModal
                                open={openInviteModal}
                                handleClose={handleCloseInviteModal}
                                projectId={selectedProject}
                                userList={userList}
                            />
                        )}
                        {selectedProject && (
                            <EditProject
                                project={selectedProject}
                                open={openEditModal}
                                handleClose={handleCloseEdit}
                            />
                        )}
                        {projectToDelete && (
                            <DeleteProjectModal
                                project={projectToDelete}
                                open={openDeleteModal}
                                handleClose={() => {
                                    setOpenDeleteModal(false);
                                    setProjectToDelete(null);
                                }}
                                onConfirm={handleConfirmDelete}
                            />
                        )}
                    </>
                )}
            </div>
        </PageTransition>
    );
}

export default Projects;