import { Box, Button, Modal, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import ModalTransition from './ModalTransitions';

const NoteDetailsModal = ({ note, open, handleClose }) => {
  const isMobile = useMediaQuery('(max-width:420px)');

  return (
    <ModalTransition isOpen={open} onClose={handleClose}>
        <Box sx={{ 
            width: isMobile ? '90%' : '50%', 
            height: 'fit-content', 
            backgroundColor: 'primary.main', 
            borderRadius: '20px', 
            display: 'flex', 
            flexDirection: 'column', 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            padding: 4, 
            gap: 3 
        }}>
            <Typography variant="h2" sx={{ 
                color: 'text.primary',
                fontFamily: 'Nothing',
                fontSize: isMobile ? '1.5rem' : '3rem',
                borderBottom: '2px solid',
                borderColor: 'accent',
                paddingBottom: 1
            }}>
                {note?.title}

                {note?.username ? (
                    <span className='flex flex-row gap-1 items-center'>
                        <Typography sx={{ 
                            color: 'text.primary', 
                            fontFamily: 'Nothing',
                            fontSize: isMobile ? '0.9rem' : '1rem'
                        }}>
                            Created by:
                        </Typography>
                        <Typography sx={{ 
                            color: 'accent', 
                            fontFamily: 'Nothing',
                            fontSize: isMobile ? '0.9rem' : '1rem'
                        }}>
                            {note.username}
                        </Typography>
                    </span>
                ) : (
                    <></>
                )}
            </Typography>

            <Typography sx={{ 
                color: 'text.primary',
                fontFamily: 'Nothing',
                fontSize: isMobile ? '0.9rem' : '1rem',
                width: '100%',  // Cambiado de 100px a 100%
                minHeight: 'fit-content',
                display: 'flex',
                flexWrap: 'wrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                // Limitamos a 3 líneas de texto
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                wordBreak: 'break-word',
                whiteSpace: 'pre-line',  
            }}>
                {note?.content}
            </Typography>

            <Box sx={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? 2 : 4, 
                marginTop: 2 
            }}>
                <Typography sx={{ 
                    color: 'text.primary',
                    fontFamily: 'Nothing',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                }}>
                    Due Date: 
                    <span style={{ 
                        color: '#D71921', 
                        marginLeft: '8px',
                        fontSize: isMobile ? '0.9rem' : '1rem'
                    }}>
                        {new Date(note.dueDate).toLocaleString('es-ES', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZone: 'Europe/Madrid',
                        })}
                    </span>
                </Typography>

                <Typography sx={{ 
                    color: 'text.primary',
                    fontFamily: 'Nothing',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                }}>
                    Reminder Date: 
                    <span style={{ 
                        color: '#D71921', 
                        marginLeft: '8px',
                        fontSize: isMobile ? '0.9rem' : '1rem'
                    }}>
                        {new Date(note.reminderDate).toLocaleString('es-ES', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZone: 'Europe/Madrid',
                        })}
                    </span>
                </Typography>
            </Box>

            <Button 
                onClick={() => handleClose()}
                variant='contained'
                sx={{
                    backgroundColor: 'accent',
                    fontFamily: 'Nothing',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    borderRadius: '50px',
                    marginTop: 2,
                    '&:hover': {
                        backgroundColor: 'darkred',
                        transform: 'scale(1.02)'
                    }
                }}
            >
                Close
            </Button>
        </Box>
    </ModalTransition>
  )
}

export default NoteDetailsModal