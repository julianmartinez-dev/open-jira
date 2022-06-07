import { createTheme } from '@mui/material';
import { grey, red } from '@mui/material/colors';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },

  components: {
    
  }
});
