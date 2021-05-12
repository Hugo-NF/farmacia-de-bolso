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
    success: '#27AE60',
    error: '#EB5757',
    text: 'black',
    onSurface: '#000000',
    warning: '#F2994A',
  },
  animation: {
    scale: 1.0,
  },
};

export default theme;
