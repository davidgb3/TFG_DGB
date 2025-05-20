import { createTheme } from "@mui/material";

const accentColor = '#D71921';

export const getTheme = (mode) => {
  const isDark = mode === 'dark';
  
  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: isDark ? '#1B1B1D' : '#ffffff',
        light: isDark ? '#3E3E40' : '#bababf', 
        dark: isDark ? '#000000' : '#e0e0e0',
        contrastText: isDark ? '#fff' : '#000',
      },
      accent: accentColor,
      text: {
        primary: isDark ? '#ffffff' : '#1B1B1D',
        secondary: isDark ? '#f5f5f5' : '#3E3E40',
      },
      background: {
        default: isDark ? '#1B1B1D' : '#ffffff',
        paper: isDark ? '#000000' : '#f5f5f5',
      }
    },
    components: {
      MuiPickersTextField: {
        styleOverrides: {
          root: {
            color: isDark ? '#ffffff' : '#1B1B1D',
            borderRadius: '5px',
            backgroundColor: isDark ? '#1B1B1D' : '#ffffff',
            fontFamily: 'Nothing',
            innerHeight: 'fit-content',
            label: {
              fontFamily: 'Nothing',
              color: isDark ? '#ffffff' : '#1B1B1D'
            }
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: isDark ? '#ffffff' : '#1B1B1D',
            '& input': {
              color: isDark ? '#ffffff' : '#1B1B1D'
            }
          }
        }
      },
      MuiDateCalendar: {
        styleOverrides: {
          root: {
            color: isDark ? '#ffffff' : '#1B1B1D',
            borderRadius: '2px',
            borderWidth: '1px',
            backgroundColor: isDark ? '#1B1B1D' : '#ffffff',
            borderColor: accentColor,
            border: `2px solid ${accentColor}`
          }
        }
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            color: isDark ? '#ffffff' : '#1B1B1D',
            borderRadius: '5px',
            backgroundColor: isDark ? '#1B1B1D' : '#ffffff',
            fontFamily: 'Nothing',
            '&:hover': {
              color: accentColor,
              backgroundColor: isDark ? '#3E3E40' : '#f5f5f5'
            }
          },
          today: {
            color: accentColor,
            borderColor: accentColor,
            border: `2px solid ${accentColor}`
          },
          selected: {
            color: '#ffffff',
            backgroundColor: `${accentColor} !important`
          }
        }
      },
      MuiClock: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? '#1B1B1D' : '#ffffff',
            borderRadius: '10px',
            border: `2px solid ${accentColor}`
          },
          clock: {
            backgroundColor: isDark ? '#1B1B1D' : '#ffffff',
            '& .MuiClockPointer-root': {
              backgroundColor: accentColor
            },
            '& .MuiClockPointer-thumb': {
              backgroundColor: accentColor,
              borderColor: accentColor
            }
          },
          pin: {
            backgroundColor: accentColor
          }
        }
      },
      MuiClockNumber: {
        styleOverrides: {
          root: {
            fontFamily: 'Nothing',
            color: isDark ? '#ffffff' : '#1B1B1D',
            '&.Mui-selected': {
              color: '#ffffff',
              backgroundColor: accentColor
            }
          }
        }
      },
      MuiTimeClock: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? '#1B1B1D' : '#ffffff',
            '& .MuiClock-pin': {
              backgroundColor: accentColor
            },
            '& .MuiClockPointer-root': {
              backgroundColor: accentColor
            }
          }
        }
      },
      MuiPickersPopper: {
        styleOverrides: {
          paper: {
            backgroundColor: isDark ? '#1B1B1D' : '#ffffff',
            color: isDark ? '#ffffff' : '#1B1B1D'
          }
        }
      },
      MuiPickersToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? '#1B1B1D' : '#ffffff',
            color: isDark ? '#ffffff' : '#1B1B1D'
          }
        }
      }
    }
  });
};