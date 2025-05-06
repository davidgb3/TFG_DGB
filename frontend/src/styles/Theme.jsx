import { createTheme } from "@mui/material";

const accentColor = '#D71921';
const primaryMain = '#1B1B1D';
const primaryLight = '#3E3E40';
const primaryDark = '#000000';
const textColor = '#ffffff';

export const theme = createTheme({
    palette: {
      primary: {
        main: primaryMain,
        light: primaryLight, // versión más clara del color principal
        dark: primaryDark,  // versión más oscura del color principal
        contrastText: '#fff',
      },
      accent: accentColor,  // Definimos el color como una propiedad directa
      text: {
        primary: textColor,
        contrastText: '#000',
      }
    },

    components: {
      MuiPickersTextField: {
        styleOverrides: {
          root: {
            color: textColor,
            borderRadius: '5px',
            backgroundColor: primaryMain,
            fontFamily: 'Nothing',
            innerHeight: 'fit-content',
            label: {
              fontFamily: 'Nothing',
              color: textColor
            }
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: textColor,
            '& input': {
              color: textColor
            }
          }
        }
      },
      MuiDateCalendar: {
        styleOverrides: {
          root: {
            color: primaryMain,
            borderRadius: '2px',
            borderWidth: '1px',
            borderColor: accentColor,
            border: `2px solid ${accentColor}`,
            backgroundColor: textColor,
          }
        }
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            color: primaryMain,
            borderRadius: '5px',
            borderColor: accentColor,
            border: `1px solid ${accentColor}`,
            backgroundColor: textColor,
            fontFamily: 'Nothing',
            '&:hover': {
              color: accentColor,
              border: `2px solid ${primaryLight}`,
            }
          },
          today: {
            color: accentColor,
            borderColor: accentColor,
            border: `2px solid ${accentColor}`,
          },
          selected: {
            color: textColor,
            backgroundColor: accentColor,
            border: `2px solid grey`,
          }
        }
      }
    }
});