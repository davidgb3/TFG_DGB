import { Box, Button, Modal, TextareaAutosize, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useState, useEffect } from 'react'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useNote } from '../context/NoteContext';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { es } from 'date-fns/locale';
import ModalTransition from './ModalTransitions';

const EditNoteModal = ({ note, open, handleClose }) => {
    const { updateNote, error } = useNote();
    const isMobile = useMediaQuery('(max-width:420px)');

    const [formData, setFormData] = useState({
        title: note?.title || "",
        content: note?.content || "",
        dueDate: note?.dueDate ? new Date(note.dueDate) : null,
        reminderDate: note?.reminderDate ? new Date(note.reminderDate) : null
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }

    const handleDateChange = (newValue) => {
      setFormData({ ...formData, dueDate: newValue });
    };

    const handleReminderDateChange = (newValue) => {
      setFormData({ ...formData, reminderDate: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        updateNote(note._id, formData);
        if(!error){
            setTimeout(() => {
                handleClose();
                window.location.reload();
            }, 500);
        }
    };

    // Función para verificar si el formulario es válido
    const isFormValid = () => {
        return formData.title && 
               formData.content && 
               formData.dueDate; // Añadimos dueDate a la validación
    };

    // Función para obtener la fecha mínima (actual + 5 minutos)
    const getMinDate = () => {
        const now = new Date();
        return new Date(now.getTime() + 5 * 60000);
    };

    // Función para verificar si una fecha es hoy
    const isToday = (date) => {
        if (!date) return false;
        const today = new Date();
        const compareDate = new Date(date);
        
        return compareDate.getDate() === today.getDate() &&
              compareDate.getMonth() === today.getMonth() &&
              compareDate.getFullYear() === today.getFullYear();
    };

    // Función para obtener la hora mínima
    const getMinTime = (date) => {
        return isToday(date) ? getMinDate() : null;
    };

  return (
    <>
        <ModalTransition isOpen={open} onClose={handleClose}>
            <Box sx={{ 
                width: isMobile ? '90%' : '50%', 
                height: 'fit-content', 
                backgroundColor: 'primary.main', 
                borderRadius: '20px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'start', 
                alignItems: 'start', 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                padding: isMobile ? 1 : 2, 
                gap: isMobile ? 1 : 2 
            }}>
                <Box component="form" method="post" onSubmit={handleSubmit} sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'center', 
                    alignItems: 'start', 
                    gap: isMobile ? 1 : 2, 
                    width: "100%", 
                    height: "100%", 
                    flexWrap: 'wrap' 
                }}>

                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'start', 
                        alignItems: 'start', 
                        gap: isMobile ? 1 : 2, 
                        width: "100%", 
                        height: "fit-content" 
                    }}>
                      <TextField required type="text" value={formData.title} onChange={handleChange} name="title"  placeholder="Title" label="Title" variant="filled" sx={{
                          width: "100%",
                          height: "fit-content",
                          backgroundColor: 'primary.main',
                          color: 'text.primary',
                          borderRadius: '5px',
                          '& .MuiFilledInput-input': { 
                            color: 'accent', 
                            fontFamily: 'Nothing',
                            fontSize: isMobile ? '1.5rem' : '3rem',     
                          },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'primary.main',
                            },
                            '&:hover fieldset': {
                              borderColor: 'accent',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'accent',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'text.primary',
                            fontFamily: 'Nothing',
                            '&.Mui-focused': {
                              color: 'accent'
                            }
                          },
                          '& .MuiOutlinedInput-input': {
                            color: 'primary.main',
                          }
                        }}/>
                    </Box>

                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', gap: 2, width:"100%", height:"100%" }}>
                        <TextField required multiline minRows={4} maxRows={8} type="text" value={formData.content} onChange={handleChange} name="content"  placeholder="Content" label="Content" variant="filled" sx={{
                          width: "100%",
                          backgroundColor: 'primary.main',
                          color: 'text.primary',
                          borderRadius: '5px',
                          '& .MuiFilledInput-input': { 
                            color: 'accent', 
                            fontFamily: 'Nothing',     
                          },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'primary.main',
                            },
                            '&:hover fieldset': {
                              borderColor: 'accent',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'accent',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'text.primary',
                            fontFamily: 'Nothing',
                            '&.Mui-focused': {
                              color: 'accent'
                            }
                          },
                          '& .MuiOutlinedInput-input': {
                            color: 'primary.main',
                          }
                        }}/>
                    </Box>

                    <Box component='div' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'start', gap: 2, width:"100%", height:"100%" }} >
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                          <DateTimePicker 
                            required 
                            views={['day', 'hours', 'minutes']} 
                            defaultValue={getMinDate()} 
                            value={formData.dueDate} 
                            onChange={handleDateChange} 
                            id="dueDate" 
                            name="dueDate" 
                            label="Due Date"
                            format="dd/MM/yyyy HH:mm"
                            slotProps={{
                              textField: {
                                required: true,
                              }
                            }} 
                            minDate={getMinDate()}
                            minTime={getMinTime(formData.dueDate)}
                            sx={{ width: "100%" }}
                            viewRenderers={{
                              hours: renderTimeViewClock,
                              minutes: renderTimeViewClock,
                            }}
                            timezone="Europe/Madrid"
                          />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                          <DateTimePicker 
                            required
                            views={['day', 'hours', 'minutes']} 
                            defaultValue={getMinDate()} 
                            value={formData.reminderDate} 
                            onChange={handleReminderDateChange} 
                            id="reminderDate" 
                            name="reminderDate" 
                            label="Reminder Date"
                            format="dd/MM/yyyy HH:mm"
                            slotProps={{
                              textField: {
                                required: true,
                              }
                            }} 
                            minDate={getMinDate()}
                            minTime={getMinTime(formData.reminderDate)}
                            sx={{ width: "100%" }}
                            viewRenderers={{
                              hours: renderTimeViewClock,
                              minutes: renderTimeViewClock,
                            }}
                            timezone="Europe/Madrid"
                          />
                        </LocalizationProvider>
                    </Box>
                  
                    <Button 
                      variant='contained'
                      type='submit' 
                      disabled={!isFormValid()} // Deshabilitamos el botón si el form no es válido
                      sx={{
                        backgroundColor: isFormValid() ? 'crimson' : 'grey',
                        fontFamily: 'Nothing',
                        borderRadius: '50px',
                        padding: isMobile ? '5px' : '9px',
                        fontSize: isMobile ? '0.75rem' : '1rem',
                        color: 'text.main',
                        width: '100%',
                        '&:hover': {
                          fontWeight: 'bold',
                          color: 'white',
                          backgroundColor: isFormValid() ? 'darkred' : 'grey'
                        }
                      }}
                    >
                      Edit Note
                    </Button>
                </Box>
            </Box>
        </ModalTransition>
    </>
  )
}

export default EditNoteModal