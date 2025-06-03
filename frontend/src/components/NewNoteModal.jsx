import { Box, Button, Modal, TextareaAutosize, TextField, Typography, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { es } from 'date-fns/locale';
import { useNote } from '../context/NoteContext';
import { useParams } from 'react-router-dom';
import ModalTransition from './ModalTransitions';
import { useProject } from '../context/ProjectContext';

const NewNoteModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { newNote, error } = useNote();

    const { id } = useParams();
    const { getProjectNotes } = useProject();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        dueDate: [null, null],
        reminderDate: [null, null],
        projectId: id ? id : null,
      })

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

    const handleSubmit = (e) => {
      e.preventDefault();

      newNote(formData);
      if(!error){
        setTimeout(() => {
          handleClose();
          // window.location.reload();
        }, 500);
      }

      if(formData.projectId){
        getProjectNotes(formData.projectId);
      }
    };

    // Función para verificar si el formulario es válido
    const isFormValid = () => {
        return formData.title && 
               formData.content && 
               formData.dueDate &&
               formData.reminderDate; 
    };

    const isMobile = useMediaQuery('(max-width:420px)');

  return (
    <>
        <Button 
          onClick={handleOpen} 
          variant='contained' 
          color="text.main"
          sx={{
            backgroundColor: 'crimson',
            fontFamily: 'Nothing',
            borderRadius: '10px',
            padding: isMobile ? '5px' : '9px',
            fontSize: isMobile ? '0.75rem' : '1rem',
            color: 'text.main',
            transition: 'all 0.3s ease',
            '&:hover': {
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: 'darkred',
              borderRadius: '15px',
            }
          }}
        >
          New Note *
        </Button>
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
                <h1 className='underline decoration-dotted' style={{ 
                    fontFamily: 'Nothing', 
                    color: 'white', 
                    fontSize: isMobile ? '2rem' : '4rem', 
                    fontWeight: 'bold' 
                }}>New Note**</h1>
                <Box component="form" method="post" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', alignItems: 'start', gap: 2, width:"100%", height:"100%", flexWrap: 'wrap' }}>
                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', gap: 2, width: isMobile ? '100%' : "45%", height:"100%" }}>
                        <TextField required type="text" value={formData.title} onChange={handleChange} name="title"  placeholder="Title" label="Title" variant="filled" sx={{
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

                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', gap: 2, width: isMobile ? '100%' : "45%", height:"100%" }} >
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                          <DateTimePicker 
                            required 
                            views={['day', 'hours', 'minutes']} 
                            defaultValue={new Date()} 
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
                            minDate={new Date()} 
                            sx={{ width: "100%" }}
                            viewRenderers={{
                              hours: renderTimeViewClock,
                              minutes: renderTimeViewClock,
                            }}
                          />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                          <DateTimePicker 
                            required
                            views={['day', 'hours', 'minutes']} 
                            defaultValue={new Date()} 
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
                            minDate={new Date()} 
                            sx={{ width: "100%" }}
                            viewRenderers={{
                              hours: renderTimeViewClock,
                              minutes: renderTimeViewClock,
                            }}
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
                      Add Note
                    </Button>
                </Box>
            </Box>
        </ModalTransition>
    </>
  )
}

export default NewNoteModal