import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'

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
                fontSize: '1.2rem',
                whiteSpace: 'pre-wrap'
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
                    fontFamily: 'Nothing'
                }}>
                    Due Date: 
                    <span style={{ color: '#D71921', marginLeft: '8px' }}>
                        {note?.dueDate && new Date(note.dueDate).toLocaleDateString()}
                    </span>
                </Typography>

                <Typography sx={{ 
                    color: 'text.primary',
                    fontFamily: 'Nothing'
                }}>
                    Reminder Date: 
                    <span style={{ color: '#D71921', marginLeft: '8px' }}>
                        {note?.reminderDate && new Date(note.reminderDate).toLocaleDateString()}
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