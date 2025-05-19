import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'
import { formatDateInCEST } from '../helpers/HourRenderFix.jsx';

const NoteDetailsModal = ({ note, open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
        <Box sx={{ 
            width: '50%', 
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
                fontSize: '3rem',
                borderBottom: '2px solid',
                borderColor: 'accent',
                paddingBottom: 1
            }}>
                {note?.title}
            </Typography>

            <Typography sx={{ 
                color: 'text.primary',
                fontFamily: 'Nothing',
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
                flexDirection: 'row', 
                gap: 4, 
                marginTop: 2 
            }}>
                <Typography sx={{ 
                    color: 'text.primary',
                    fontFamily: 'Nothing',
                }}>
                    Due Date: 
                    <span style={{ color: '#D71921', marginLeft: '8px' }}>
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
                    fontFamily: 'Nothing'
                }}>
                    Reminder Date: 
                    <span style={{ color: '#D71921', marginLeft: '8px' }}>
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
    </Modal>
  )
}

export default NoteDetailsModal