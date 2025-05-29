import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'

const DeleteProjectModal = ({ project, open, handleClose, onConfirm }) => {
  return (
    <Modal 
      open={open} 
      onClose={handleClose}
    >
        <Box sx={{ 
            width: '30%', 
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
            padding: 4, 
            gap: 3 
        }}>
            <Typography variant="h4" sx={{ 
                color: 'text.primary',
                fontFamily: 'Nothing',
                borderBottom: '2px solid',
                borderColor: 'accent',
                fontSize: '2.5rem',
                paddingBottom: 1
            }}>
                Delete Project
            </Typography>

            <Typography sx={{ 
                color: 'text.primary',
                fontFamily: 'Nothing',
                textAlign: 'center'
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
    </Modal>
  )
}

export default DeleteProjectModal