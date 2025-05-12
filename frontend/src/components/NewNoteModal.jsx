import { Box, Button, Modal, TextareaAutosize, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useNote } from '../context/NoteContext';

const NewNoteModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { newNote, error } = useNote();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        dueDate: null,
        reminderDate: null,
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

  return (
    <>
        <Button 
          onClick={handleOpen} 
          variant='contained' 
          color="text.main"
          sx={{
            backgroundColor: 'crimson',
            fontFamily: 'Nothing',
            borderRadius: '50px 10px 10px 50px',
            padding: '9px',
            color: 'text.main',
            '&:hover': {
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: 'darkred'
            }
          }}
        >
          New Note
        </Button>
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ width: '50%', height: 'fit-content', backgroundColor: 'primary.main', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: 2, gap: 2 }}>
                <h1 className='underline decoration-dotted' style={{ fontFamily: 'Nothing', color: 'white', fontSize: '4rem', fontWeight: 'bold' }}>New Note**</h1>
                <Box component="form" method="post" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'start', gap: 2, width:"100%", height:"100%", flexWrap: 'wrap' }}>
                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', gap: 2, width:"45%", height:"100%" }}>
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

                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', gap: 2, width:"45%", height:"100%" }} >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker required defaultValue={new Date()} value={formData.dueDate} onChange={handleDateChange} id="dueDate" name="dueDate" label="Due Date" slotProps={{
                            textField: {
                                required: true,
                            }
                          }} minDate={new Date()} sx={{ width: "100%" }}/>
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker value={formData.reminderDate} onChange={handleReminderDateChange} id="reminderDate" name="reminderDate" label="Reminder Date *" minDate={new Date()} sx={{ width: "100%" }}/>
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
                        padding: '9px',
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
        </Modal>
    </>
  )
}

export default NewNoteModal