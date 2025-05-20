import { Box, Typography } from "@mui/material";
import NewProjectModal from "../components/NewProjectModal";
import { useProject } from "../context/ProjectContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Projects = () => {

    const { projects } = useProject();
    const { user } = useAuth();
    
    const navigate = useNavigate();

    const handleProjectNotes = (projectId) => {
        navigate(`/project/${projectId}`);	
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
                        <Typography variant="h2" 
                            sx={{ 
                                fontFamily: 'Nothing',
                                fontSize: '2.25rem',
                                width: 'auto',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                wordBreak: 'break-word',
                                paddingRight: '50px',
                                color: 'text.primary',
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
        </div>
    );
}

export default Projects;