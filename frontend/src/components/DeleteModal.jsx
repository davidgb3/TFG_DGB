import { Box, Button, Modal, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import ModalTransition from './ModalTransitions';

const DeleteModal = ({ note, open, handleClose, onConfirm }) => {
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
                Delete Note
            </Typography>

            <Typography sx={{ 
                color: 'text.primary',
                fontFamily: 'Nothing',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                // Limitamos a 3 líneas de texto
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                wordBreak: 'break-word',
                whiteSpace: 'pre-line',
                fontSize: isMobile ? '0.875rem' : '1rem',
                textAlign: 'center'
            }}>
                Are you sure you want to delete the note "{note?.title}"?
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
                        onConfirm(note);
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

export default DeleteModal