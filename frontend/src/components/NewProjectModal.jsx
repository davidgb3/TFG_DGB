import { Box, Button, Modal, TextareaAutosize, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useProject } from '../context/ProjectContext';

const NewProjectModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { newProject, error } = useProject();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
      })

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      newProject(formData);
      if(!error){
        setTimeout(() => {
          handleClose();
          // window.location.reload();
        }, 200);
      }
    };

    // Función para verificar si el formulario es válido
    const isFormValid = () => {
        return formData.name && 
               formData.description;
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
            borderRadius: '10px',
            padding: '9px',
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
          New Project *
        </Button>
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ width: '50%', height: 'fit-content', backgroundColor: 'primary.main', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: 2, gap: 2 }}>
                <h1 className='underline decoration-dotted' style={{ fontFamily: 'Nothing', color: 'white', fontSize: '4rem', fontWeight: 'bold' }}>New Project**</h1>
                <Box component="form" method="post" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'start', gap: 2, width:"100%", height:"100%", flexWrap: 'wrap' }}>
                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', gap: 2, width:"100%", height:"100%" }}>
                        <TextField required type="text" value={formData.name} onChange={handleChange} name="name"  placeholder="Name" label="Name" variant="filled" sx={{
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

                        <TextField required multiline minRows={4} maxRows={8} type="text" value={formData.description} onChange={handleChange} name="description"  placeholder="Description" label="Description" variant="filled" sx={{
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
                      Add Project
                    </Button>
                </Box>
            </Box>
        </Modal>
    </>
  )
}

export default NewProjectModal