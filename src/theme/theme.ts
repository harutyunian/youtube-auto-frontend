import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f7f7f7',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 8,
  },
})

export default theme


