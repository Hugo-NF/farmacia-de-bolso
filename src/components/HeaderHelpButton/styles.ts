import { StyleSheet } from 'react-native';
import theme from 'constants/theme';

export const styleSheet = StyleSheet.create({
  positioning: {
    position: 'absolute',
    right: 20,
    bottom: 0,
  },
  button: {
    borderRadius: 9999,
    backgroundColor: theme.colors.accent,
    padding: 3,
    aspectRatio: 1,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});
