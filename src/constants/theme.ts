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
    error: '#B00020',
    text: 'black',
    darkText: '#000',
    onSurface: '#000000',
  },
  animation: {
    scale: 1.0,
  },
};

export default theme;
