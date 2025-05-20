import { useParams } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

const ProjectNotes = () => {
  const { id } = useParams();
  const { projects, getProjectNotes, projectNotes } = useProject();
  
  // Encontrar el proyecto actual usando el id de la URL
  const currentProject = projects?.find(project => project._id === id);

  useEffect(() => {
    if (id) {
      getProjectNotes(id);
    }
  }, [id]);

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
      }}>
        {currentProject?.name}
      </Typography>
      
      {/* Cambiamos la estructura para evitar anidar Typography */}
      <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          marginBottom: '20px',
      }}>
        <Typography 
          sx={{ 
            color: 'accent', 
            fontFamily: 'Nothing', 
            fontSize: '1.5rem' 
          }}
        >
          Description:
        </Typography>
        <Typography 
          sx={{ 
            color: 'text.primary',
            fontFamily: 'Nothing',
            fontSize: '1.5rem'
          }}
        >
          {currentProject?.description}
        </Typography>
      </Box>
      
      {/* Aquí puedes renderizar las notas del proyecto */}
      <Box 
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
          }}
      >
        <Typography variant="h2" 
            sx={{ 
                fontFamily: 'Nothing',
                fontSize: '2rem',
                color: 'text.primary',
                borderBottom: '2px solid',
                borderColor: 'accent',
                marginBottom: '10px',
            }}>
          Notes:
        </Typography>
        {projectNotes?.notes?.map((note) => (
          <Box 
            key={note._id} 
            sx={{ 
              padding: 2, 
              backgroundColor: 'primary.light', 
              borderRadius: '5px', 
              marginBottom: 1,
              width: '100%'
            }}
          >
            <Typography variant="h3" sx={{ 
              color: 'text.primary',
              fontFamily: 'Nothing',
              fontSize: '1.5rem',
              marginBottom: 1
            }}>
              {note.title}
            </Typography>
            <Typography variant="body1" sx={{ 
              color: 'text.primary',
              fontFamily: 'Nothing' 
            }}>
              {note.content}
            </Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default ProjectNotes;