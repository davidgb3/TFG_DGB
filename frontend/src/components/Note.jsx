import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Note = ({ note, onToggleComplete, onEdit, onView, onMarkAsImportant, onDelete }) => {
    const isMobile = useMediaQuery('(max-width:420px)');

    return (
        <Box 
            component='div' 
            onClick={() => onView(note)}
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
                border: note.important ? '2px solid' : 'none',
                borderColor: note.important ? 'accent' : 'transparent',
                opacity: note.isCompleted ? 0.7 : 1,
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
                            fontSize: isMobile ? '1.5rem' : '2rem',
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
                        fontSize: isMobile ? '1.2rem' : '1.5rem',
                        '&:hover': {
                            color: 'accent',
                            transform: 'scale(1.1)'
                        }
                    }}
                />
                {!note.important ? (
                    <PriorityHighIcon 
                        onClick={(e) => onMarkAsImportant(e, note)}
                        sx={{
                            color: 'text.primary',
                            transition: 'all 0.3s ease',
                            fontSize: isMobile ? '1.5rem' : '2rem',
                            '&:hover': {
                                color: 'accent',
                                transform: 'scale(1.1)'
                            }
                        }}
                    />
                ) : (
                    <PriorityHighIcon 
                        onClick={(e) => onMarkAsImportant(e, note)}
                        sx={{
                            color: 'accent',
                            transition: 'all 0.3s ease',
                            fontSize: isMobile ? '1.5rem' : '2rem',
                            '&:hover': {
                                color: 'text.primary',
                                transform: 'scale(1.1)'
                            }
                        }}
                    />
                )}
                <DeleteForeverIcon 
                    onClick={(e) => onDelete(e, note)}
                    sx={{
                        color: 'text.primary',
                        transition: 'all 0.3s ease',
                        fontSize: isMobile ? '1.5rem' : '2rem',
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
                    fontSize: isMobile ? '1.125rem' : '2.25rem',
                    width: 'auto',
                    maxWidth: 'calc(100% - 100px)', // Espacio para los iconos
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    wordBreak: 'break-word',
                    paddingRight: '50px',
                    color: 'text.primary',
                    marginRight: '100px' // Espacio fijo para los iconos
                }}
            >
                {note.title}
            </Typography>
            <Typography 
                sx={{ 
                    fontFamily: 'Nothing',
                    fontSize: isMobile ? '0.875rem' : '1rem',
                    width: '100%',  
                    minHeight: 'fit-content',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-line',  // Mantiene los saltos de línea
                    color: 'text.primary'
                }}
            >
                {note.content}
            </Typography>
            <span className='flex flex-row gap-1 items-center justify-between flex-wrap'>
                <Typography sx={{ 
                    color: 'text.primary', 
                    fontFamily: 'Nothing',
                    fontSize: isMobile ? '0.875rem' : '1rem'
                }}>
                    Due Date:
                </Typography>
                <Typography sx={{ 
                    color: 'accent', 
                    fontFamily:'Nothing',
                    fontSize: isMobile ? '0.875rem' : '1rem'
                }}>
                    {new Date(note.dueDate).toLocaleString('es-ES', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: 'Europe/Madrid',
                    })}
                </Typography>
                {note?.username ? (
                    <span className='flex flex-row gap-1 items-center'>
                        <Typography sx={{ 
                            color: 'text.primary', 
                            fontFamily: 'Nothing',
                            fontSize: isMobile ? '0.875rem' : '1rem'
                        }}>
                            Created by:
                        </Typography>
                        <Typography sx={{ 
                            color: 'accent', 
                            fontFamily: 'Nothing',
                            fontSize: isMobile ? '0.875rem' : '1rem'
                        }}>
                            {note.username}
                        </Typography>
                    </span>
                ) : (
                    <></>
                )}
            </span>
        </Box>
    );
};

export default Note;