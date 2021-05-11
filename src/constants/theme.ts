import { DefaultTheme } from 'react-native-paper';

// Customizar tema posteriormente
const theme = {
  ...DefaultTheme,
  dark: false,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#56CCF2',
    accent: '#2F80ED',
    background: 'white',
    surface: 'white',
    error: '#B00020',
    text: 'black',
    onSurface: '#000000',
  },
  animation: {
    scale: 1.0,
  },
};

export default theme;
