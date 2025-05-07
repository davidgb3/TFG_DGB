import React from 'react';
import { Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

const Note = ({ note, onToggleComplete, onEdit, onView }) => {
    return (
        <Box 
            component='div' 
            onClick={() => onView(note)}
            sx={{ 
                width: '300px', 
                minWidth: '250px', 
                maxWidth: '100%',
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
                {!note.isCompleted && (
                    <DoneIcon 
                        onClick={(e) => onToggleComplete(e, note)}
                        sx={{
                            color: 'text.primary',
                            transition: 'all 0.3s ease',
                            fontSize: '2rem',
                            '&:hover': {
                                color: 'accent',
                                transform: 'scale(1.1)'
                            }
                        }}
                    />
                )}
                <EditIcon 
                    onClick={(e) => onEdit(e, note)}
                    sx={{
                        color: 'text.primary',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            color: 'accent',
                            transform: 'scale(1.1)'
                        }
                    }}
                />
            </Box>
            <Typography 
                variant="h2" 
                sx={{ 
                    fontFamily: 'Nothing',
                    fontSize: '2.25rem',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    wordBreak: 'break-word',
                    paddingRight: '50px',
                    color: 'text.primary'
                }}
            >
                {note.title}
            </Typography>
            <Typography 
                sx={{ 
                    fontFamily: 'Nothing',
                    width: '100%',  
                    minHeight: 'fit-content',
                    display: '-webkit-box',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    wordBreak: 'break-word'  
                }}
            >
                {note.content}
            </Typography>
            <span className='flex flex-row gap-1'>
                Due Date: 
                <Typography sx={{ color: 'accent', fontFamily:'Nothing' }}>
                    {new Date(note.dueDate).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    })}
                </Typography>
            </span>
        </Box>
    );
};

export default Note;