import { createTheme } from '@mui/material/styles';

interface CustomPalette {
  deposit: string;
  withdrawal: string;
}

declare module '@mui/material/styles' {
  interface Palette {
    custom: CustomPalette;
  }
  interface PaletteOptions {
    custom?: CustomPalette;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#E91E63',
    },
    secondary: {
      main: '#f50057',
    },
    custom: {
      deposit: 'green',
      withdrawal: 'red',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          '& .MuiSvgIcon-root': {
            opacity: 1,
            color: 'black',
          },
        },
      },
    },
  },
});

export default theme;
