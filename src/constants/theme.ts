import { DefaultTheme } from 'react-native-paper';

// Customizar tema posteriormente
const theme = {
  ...DefaultTheme,
  dark: false,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f6f6f6',
    surface: 'white',
    error: '#EB5757',
    text: 'black',
    darkText: '#000',
    onSurface: '#000000',
    warning: '#F2994A',
  },
  animation: {
    scale: 1.0,
  },
};

export default theme;
