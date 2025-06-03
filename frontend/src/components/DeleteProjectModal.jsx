import { Box, Button, Modal, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import ModalTransition from './ModalTransitions';

const DeleteProjectModal = ({ project, open, handleClose, onConfirm }) => {
  const isMobile = useMediaQuery('(max-width:420px)');

  return (
    <ModalTransition
      isOpen={open} 
      onClose={handleClose}
    >
        <Box sx={{ 
            width: isMobile ? '80%' : '30%', 
            height: 'fit-content', 
            backgroundColor: 'primary.main', 
            borderRadius: '20px', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center', 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            padding: isMobile ? 2 : 4, 
            gap: isMobile ? 2 : 3 
        }}>
            <Typography variant="h4" sx={{ 
                color: 'text.primary',
                fontFamily: 'Nothing',
                borderBottom: '2px solid',
                borderColor: 'accent',
                fontSize: isMobile ? '1.5rem' : '2.5rem',
                paddingBottom: 1
            }}>
                Delete Project
            </Typography>

            <Typography sx={{ 
                color: 'text.primary',
                fontFamily: 'Nothing',
                textAlign: 'center',
                fontSize: isMobile ? '0.875rem' : '1rem'
            }}>
                Are you sure you want to delete the project "{project?.name}"?
                This action cannot be undone.
            </Typography>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
                gap: 0.5,
                width: '100%',
            }}>
                <Button 
                    onClick={handleClose}
                    variant='contained'
                    sx={{
                        backgroundColor: 'primary.light',
                        fontFamily: 'Nothing',
                        width: '50%',
                        fontSize: isMobile ? '0.875rem' : '1rem',
                        padding: isMobile ? '6px' : '8px',
                        borderRadius: '50px 10px 10px 50px',
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        }
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={() => {
                        onConfirm(project);
                        handleClose();
                    }}
                    variant='contained'
                    sx={{
                        backgroundColor: 'accent',
                        fontFamily: 'Nothing',
                        width: '50%',
                        fontSize: isMobile ? '0.875rem' : '1rem',
                        padding: isMobile ? '6px' : '8px',
                        borderRadius: '10px 50px 50px 10px',
                        '&:hover': {
                            backgroundColor: 'darkred',
                        }
                    }}
                >
                    Delete
                </Button>
            </Box>
        </Box>
    </ModalTransition>
  )
}

export default DeleteProjectModal